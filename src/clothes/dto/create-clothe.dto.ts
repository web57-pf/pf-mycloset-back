import { IsString, IsNotEmpty, IsUUID, IsBoolean, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateClotheDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10, {message: 'El nombre debe tener al menos 10 caracteres'})
  @MaxLength(30, {message: 'El nombre debe tener no mas de 30 caracteres'})
  name: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  favorite?: boolean;

  @IsOptional()
  @IsUUID('4', { each: true })
  combinations?: string[];
}