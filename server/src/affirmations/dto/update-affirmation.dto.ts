import { PartialType } from '@nestjs/mapped-types';
import { CreateAffirmationDto } from './create-affirmation.dto';

export class UpdateAffirmationDto extends PartialType(CreateAffirmationDto) {}
