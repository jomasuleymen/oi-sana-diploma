import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import ValidationException from "./exceptions/validation.exception";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ["log"],
	});

	app.setGlobalPrefix("api");
	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory: errors => new ValidationException(errors),
			stopAtFirstError: true,
			whitelist: true,
			transform: true,
		}),
	);

	const PORT = process.env.SERVER_PORT || 3500;
	const origin = process.env.ORIGINS
		? process.env.ORIGINS.split(",")
		: undefined;

	app.enableCors({
		origin,
		credentials: true,
		exposedHeaders: [
			"Content-Disposition",
			"Content-Length",
			"X-File-Name",
			"Content-Type",
		],
	});

	await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
	console.log("Origin: ", origin);
}
bootstrap();
