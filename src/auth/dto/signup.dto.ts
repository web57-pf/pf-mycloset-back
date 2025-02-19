import { IsEmail, IsNotEmpty, isString, IsString } from "class-validator";

export class SignupDTO{
    
    @IsString()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    
}