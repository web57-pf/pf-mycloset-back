import { PartialType } from '@nestjs/swagger';
import { CreateClotheDto } from './create-clothe.dto';

export class UpdateClotheDto extends PartialType(CreateClotheDto) {}
