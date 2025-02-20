import { IsString, IsUUID, IsArray, IsNotEmpty } from 'class-validator';

export class CreateCombinationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  clothesIds: string[];
}