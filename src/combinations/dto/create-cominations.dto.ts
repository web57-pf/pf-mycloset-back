import { IsString, IsUUID, IsArray, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateCombinationDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, {message: 'El nombre de la combinacion debe ser al menos de 5 caracteres'})
  @MaxLength(50, {message: 'El nombre no debe ser mayor a 50 caracteres'})
  name: string;

  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  clothesIds: string[];
}