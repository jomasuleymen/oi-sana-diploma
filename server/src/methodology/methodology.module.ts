import { Module } from "@nestjs/common";
import { MethodologyService } from "./methodology.service";
import { MethodologyController } from "./methodology.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Methodology } from "./entities/methodology.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Methodology])],
	controllers: [MethodologyController],
	providers: [MethodologyService],
	exports: [TypeOrmModule, MethodologyService],
})
export class MethodologyModule {}
