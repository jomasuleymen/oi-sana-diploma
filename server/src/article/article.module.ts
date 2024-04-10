import { Module } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { ArticleController } from "./article.controller";
import { Article } from "./entities/article.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/user/user.module";
import { SpecialistModule } from "src/specialist/specialist.module";

@Module({
	imports: [TypeOrmModule.forFeature([Article]), UserModule, SpecialistModule],
	controllers: [ArticleController],
	providers: [ArticleService],
})
export class ArticleModule {}
