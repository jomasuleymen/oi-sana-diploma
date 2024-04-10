import { Module } from "@nestjs/common";
import { AffirmationsService } from "./affirmations.service";
import { AffirmationsController } from "./affirmations.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Affirmation } from "./entities/affirmation.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Affirmation])],
	controllers: [AffirmationsController],
	providers: [AffirmationsService],
	exports: [TypeOrmModule, AffirmationsService],
})
export class AffirmationsModule {}
