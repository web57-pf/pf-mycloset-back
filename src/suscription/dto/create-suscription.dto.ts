import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { subscriptionCategory } from '../enum/suscriptionType';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSuscriptionDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({
    description: 'Id de la subscripción',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Precio de la subscripción',
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Duración de la subscripción',
    example: 30,
  })
  @IsNotEmpty()
  @IsNumber()
  durationDayTimes: number;

  @ApiProperty({
    description: 'Nombre de la subscripción',
    example: 'Basic',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
