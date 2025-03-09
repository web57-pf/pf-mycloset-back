import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
  @ApiProperty({
    description: 'Id del usuario',
    example: 'asdsad1231432'
  })
  userId: string;

  @ApiProperty({
    description: 'Subscripcion preferida',
    example: 'pro o premium'
  })
  preferedSub: string

  @ApiProperty({
    description: 'Precio',
    example: '300'
  })
  price: string
}
