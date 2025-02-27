import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateTagsDto {
    @IsString()
    @MinLength(3, {message: 'El nombre del tag debe ser de al menos 3 caracteres'})
    @MaxLength(15, {message: 'El nombre del tag debe ser de máximo 15 caracteres'})
    name: string
}