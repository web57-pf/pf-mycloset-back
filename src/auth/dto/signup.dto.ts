import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, isString, IsString } from "class-validator";

export class SignupDTO{
    @ApiProperty({
            description: 'Nombre',
            example: 'Alejandro Luna'
        })
    @IsString()
    name: string
     
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