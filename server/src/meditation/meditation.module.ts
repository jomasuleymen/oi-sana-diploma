import { Module } from "@nestjs/common";
import { MeditationService } from "./meditation.service";
import { MeditationController } from "./meditation.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Meditation } from "./entities/meditation.entity";
import { MeditationCategory } from "./entities/meditation-catergory.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([Meditation, MeditationCategory]),
	],
	controllers: [MeditationController],
	providers: [MeditationService],
	exports: [MeditationService, TypeOrmModule],
})
export class MeditationModule {}
