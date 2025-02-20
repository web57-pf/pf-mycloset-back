import { IsString, IsNotEmpty, IsUUID, IsBoolean, IsOptional } from 'class-validator';

export class CreateClotheDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID('4', { each: true })
  @IsOptional()
  tags?: string[];

  @IsBoolean()
  @IsOptional()
  favorite?: boolean;

  @IsUUID('4', { each: true })
  @IsOptional()
  combinations?: string[];
}