import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	HttpStatus,
	NotAcceptableException,
	ParseFilePipeBuilder,
	Patch,
	Post,
	Query,
	Req,
	Res,
	UploadedFile,
	UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request, Response } from "express";
import fs from "fs";
import { diskStorage } from "multer";
import path from "path";
import { promisify } from "util";
import { v4 as uuid } from "uuid";
import { PUBLIC_PATH } from "./upload.constant";

const unlinkAsync = promisify(fs.unlink);

@Controller("upload")
export class UploadController {
	private readonly chunkFiles: {
		[key: string]: boolean;
	} = {};

	@Post()
	@UseInterceptors(
		FileInterceptor("file", {
			storage: diskStorage({
				destination: path.join(PUBLIC_PATH, "uploads"),
				filename: (req, file, cb) => {
					const fileNameSplit = file.originalname.split(".");
					if (fileNameSplit.length < 2)
						return cb(new NotAcceptableException("Invalid file extension"), "");

					const fileExt = fileNameSplit[fileNameSplit.length - 1];
					cb(null, `${uuid()}.${fileExt}`);
				},
			}),
		}),
	)
	uploadImage(
		@Req() req: Request,
		@Res() res: Response,
		@UploadedFile(
			new ParseFilePipeBuilder().build({
				errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
				fileIsRequired: false,
			}),
		)
		file?: Express.Multer.File,
	) {
		const filename = file?.filename || uuid();
		if (!file?.filename) {
			this.chunkFiles[filename] = false;
		}
		res.json({ filename: filename, path: `/uploads/${filename}` });
	}

	@Patch()
	async uploadChunks(@Req() req: Request, @Query("patch") fileId?: string) {
		if (!fileId) return new BadRequestException("File id is required");

		if (!(fileId in this.chunkFiles)) {
			return new BadRequestException("File not found");
		}

		const uploadName = req.header("Upload-Name")!;
		const uploadLength = req.header("Upload-Length")!;
		const uploadOffset = req.header("Upload-Offset")!;
		const contentLength = req.header("Content-Length")!;

		const extension = path.extname(uploadName);
		const filePath = path.join(PUBLIC_PATH, "uploads", `${fileId}${extension}`);

		if (
			parseInt(uploadOffset) + parseInt(contentLength) >=
			parseInt(uploadLength)
		) {
			delete this.chunkFiles[fileId];
		}

		const ws = fs.createWriteStream(filePath, { flags: "a" });
		req.pipe(ws, { end: false });

		return true;
	}

	@Delete()
	deleteImage(@Body() filename: string) {
		// delete file
		unlinkAsync(
			path.join(__dirname, "..", "..", "public", "uploads", filename),
		);
		return { message: "File deleted" };
	}
}
