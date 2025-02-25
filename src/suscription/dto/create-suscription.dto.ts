import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { subscriptionCategory } from '../enum/suscriptionType';

export class CreateSuscriptionDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsString()
  category: subscriptionCategory;

  @IsUUID()
  userId: string;
}
