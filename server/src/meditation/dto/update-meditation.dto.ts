import { PartialType } from "@nestjs/mapped-types";
import { CreateMeditationDto } from "./create-meditation.dto";

export class UpdateMeditationDto extends PartialType(CreateMeditationDto) {}
