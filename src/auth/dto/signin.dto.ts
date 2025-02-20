import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SigninDTO{
    @ApiProperty({
        description: 'Correo electronico',
        example: 'user@example.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        description: 'Clave',
        example: 'Example01.'
    })
    @IsNotEmpty()
    @IsString()
    password: string
}