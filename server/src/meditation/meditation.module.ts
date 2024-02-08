import { Module } from "@nestjs/common";
import { MeditationService } from "./meditation.service";
import { MeditationController } from "./meditation.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MeditationEntity } from "./entities/meditation.entity";
import { MeditationCategoryEntity } from "./entities/meditation-catergory.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([MeditationEntity, MeditationCategoryEntity]),
	],
	controllers: [MeditationController],
	providers: [MeditationService],
	exports: [MeditationService, TypeOrmModule],
})
export class MeditationModule {}
