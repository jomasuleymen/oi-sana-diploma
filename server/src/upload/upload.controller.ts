import {
	Body,
	Controller,
	Delete,
	HttpStatus,
	NotAcceptableException,
	ParseFilePipeBuilder,
	Post,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import path from "path";
import { UseAuthorized } from "src/auth/decorators/use-auth.decorator";
import { v4 as uuid } from "uuid";
import fs from "fs";
import { promisify } from "util";

const unlinkAsync = promisify(fs.unlink);

@Controller("upload")
export class UploadController {
	@Post()
	@UseAuthorized()
	@UseInterceptors(
		FileInterceptor("file", {
			storage: diskStorage({
				destination: path.join(__dirname, "..", "..", "public", "uploads"),
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
		@UploadedFile(
			new ParseFilePipeBuilder()
				.addFileTypeValidator({ fileType: /jpeg|jpg|png|mp4|mov/ }) // images
				.build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
		)
		file: Express.Multer.File,
	) {
		return { filename: file.filename, path: `/uploads/${file.filename}` };
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
}
