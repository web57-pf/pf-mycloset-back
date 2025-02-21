import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    isDeleted?: boolean;
}

