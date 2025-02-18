import { PartialType } from '@nestjs/mapped-types';
import { CreateCombinationDto } from './create-combination.dto';

export class UpdateCombinationDto extends PartialType(CreateCombinationDto) {}
