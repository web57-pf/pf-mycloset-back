import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, isString, IsString } from "class-validator";
import { subsType } from "src/users/enum/suscriptionType";

export class updateDTO{
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

    @ApiProperty({
        description: 'Tipo de subscripcion',
        example: 'pro, premium'
    })
    @IsEnum({default: subsType.free})
    subscriptionType: subsType

    @ApiProperty({
        description: 'Role',
        example: 'admin->true'
    })
    @IsBoolean()
    isAdmin: boolean

    
}