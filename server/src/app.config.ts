import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import ValidationException from "./exceptions/validation.exception";
import { SocketIoAdapter } from "./socket/socket.adapter";
import { isProd } from "./utils/constants";

export const configApp = async (app: INestApplication<any>) => {
	const configService = app.get<ConfigService>(ConfigService);

	app.setGlobalPrefix("api");
	app.useWebSocketAdapter(new SocketIoAdapter(app, configService));
	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory: errors => new ValidationException(errors),
			stopAtFirstError: true,
			whitelist: true,
			transform: true,
		}),
	);

	const origins = configService.get("ORIGINS", "*").split(",");
	app.enableCors({
		origin: origins,
		credentials: true,
		exposedHeaders: [
			"Content-Disposition",
			"Content-Length",
			"Upload-Offset",
			"Upload-Length",
			"Content-Type",
		],
	});

	const PORT = configService.getOrThrow<number>("SERVER_PORT");
	await app.listen(PORT, () => {
		console.log(`Server started on port ${PORT}`);
		console.log("Origins: ", origins);
		console.log("Production:", isProd);
	});
};
