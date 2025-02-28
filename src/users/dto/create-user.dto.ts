import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(5, {message: 'Tu nombre de usuario debe tener al menos 5 caracteres'})
    name: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsOptional()
    isDeleted?: boolean;
}

