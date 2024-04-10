import { NestFactory } from "@nestjs/core";
import { configApp } from "./app.config";
import { AppModule } from "./app.module";

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule, {
		logger: ["log"],
	});

	await configApp(app);
};

bootstrap();
