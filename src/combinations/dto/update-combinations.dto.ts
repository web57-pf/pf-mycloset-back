import { PartialType } from '@nestjs/swagger';
import { CreateCombinationDto } from './create-cominations.dto';


export class UpdateCombinationDto extends PartialType(CreateCombinationDto) {}