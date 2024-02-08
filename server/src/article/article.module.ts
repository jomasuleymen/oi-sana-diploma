import { Module } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { ArticleController } from "./article.controller";
import { ArticleEntity } from "./entities/article.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/user/user.module";

@Module({
	imports: [TypeOrmModule.forFeature([ArticleEntity]), UserModule],
	controllers: [ArticleController],
	providers: [ArticleService],
})
export class ArticleModule {}
