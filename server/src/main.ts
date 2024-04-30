import { NestFactory } from "@nestjs/core";
import { configApp } from "./app.config";
import { AppModule } from "./app.module";
import { swaggerConfig } from "./swagger.config";

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule);

	swaggerConfig(app);
	await configApp(app);
};

bootstrap();
