import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
<<<<<<< HEAD
import { subscriptionCategory } from '../enum/categorySuscription';
=======
import { subscriptionCategory } from '../enum/suscriptionType';
>>>>>>> 4073d2be605ae305bd6d9a826a237861fc7d28e3

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
