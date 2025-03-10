import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEmailDto {
  @ApiProperty({
    description: 'Emails de los destinatarios',
    example: ['mail@mail.com'],
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Asunto del correo',
    example: 'Bienvenido a la plataforma',
  })
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty({
    description: 'Contenido HTML del correo',
    example: '<h1>Bienvenido a la plataforma</h1>',
  })
  @IsOptional()
  @IsString()
  html?: string;

  @ApiProperty({
    description: 'Tipo de correo',
    example: 'welcome',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn([
    'confirmation',
    'welcome',
    'reset.password',
    'notification',
    'subscription.confirm',
    'subscription',
    'cancel.subscription',
  ])
  type: string;
}
