import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SigninDTO{
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}