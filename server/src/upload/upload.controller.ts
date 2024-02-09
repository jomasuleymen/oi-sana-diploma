import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Head,
	Header,
	HttpStatus,
	NotAcceptableException,
	Param,
	ParseFilePipeBuilder,
	Patch,
	Post,
	Query,
	Req,
	Res,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request, Response } from "express";
import fs, { createReadStream, statSync } from "fs";
import { diskStorage } from "multer";
import path from "path";
import { UseAuthorized } from "src/auth/decorators/use-auth.decorator";
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
	@UseAuthorized()
	@UseInterceptors(
		FileInterceptor("file", {
			storage: diskStorage({
				destination: path.join(PUBLIC_PATH, "uploads"),
				filename: (req, file, cb) => {
					const fileNameSplit = file.originalname.split(".");
					if (fileNameSplit.length !== 2)
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
			new ParseFilePipeBuilder()
				.addFileTypeValidator({ fileType: /jpeg|jpg|png|mp4|mov/ }) // images
				.build({
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

	@Head()
	head() {
		console.log("head");
		return { message: "head" };
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
		const filePath = path.join(
			PUBLIC_PATH,
			"uploads",
			`${fileId}${extension}`,
		);

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
		console.log(filename);
		// delete file
		unlinkAsync(
			path.join(__dirname, "..", "..", "public", "uploads", filename),
		);
		return { message: "File deleted" };
	}

	@Get("stream/:id")
	@Header("Accept-Ranges", "bytes")
	@Header("Content-Type", "video/mp4")
	async getStreamVideo(
		@Param("id") id: string,
		@Req() { headers }: Request,
		@Res() res: Response,
	) {
		const extname = path.extname(id);
		if (!extname) {
			id = `${id}.mp4`;
		}

		const videoPath = path.join(PUBLIC_PATH, "uploads", id);
		const { size } = statSync(videoPath);
		const videoRange = headers.range;
		if (videoRange) {
			const parts = videoRange.replace(/bytes=/, "").split("-");
			const start = parseInt(parts[0], 10);
			const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
			const chunksize = end - start + 1;
			const readStreamfile = createReadStream(videoPath, {
				start,
				end,
				highWaterMark: 60,
			});
			const head = {
				"Content-Range": `bytes ${start}-${end}/${size}`,
				"Content-Length": chunksize,
			};
			res.writeHead(HttpStatus.PARTIAL_CONTENT, head); //206
			readStreamfile.pipe(res);
		} else {
			const head = {
				"Content-Length": size,
			};
			res.writeHead(HttpStatus.OK, head); //200
			createReadStream(videoPath).pipe(res);
		}
	}
}
