import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Specialist } from "./entities/specialist.entity";
import { SpecialistController } from "./specialist.controller";
import { SpecialistService } from "./specialist.service";
import { UserModule } from "src/user/user.module";

@Module({
	imports: [TypeOrmModule.forFeature([Specialist]), UserModule],
	controllers: [SpecialistController],
	providers: [SpecialistService],
	exports: [SpecialistService, TypeOrmModule],
})
export class SpecialistModule {}
