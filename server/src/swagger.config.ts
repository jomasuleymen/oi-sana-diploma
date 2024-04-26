import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const swaggerConfig = (app: INestApplication<any>) => {
	const config = new DocumentBuilder()
		.setTitle("Oi-Sana api")
		.setDescription("The Oi-Sana API description")
		.setVersion("1.0")
		.addTag("app")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);
};
