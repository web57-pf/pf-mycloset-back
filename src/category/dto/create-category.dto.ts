import { IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @MaxLength(20, {message: 'El nombre de la categoria no puede ser mayor a 20 caracteres'})
    name: string
}
