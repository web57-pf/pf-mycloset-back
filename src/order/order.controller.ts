// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   ParseUUIDPipe,
// } from '@nestjs/common';
// import { OrderService } from './order.service';
// import { CreateOrderDto } from './dto/create-order.dto';

// @Controller('order')
// export class OrderController {
//   constructor(private readonly orderService: OrderService) {}

//   @Post()
//   create(@Body() order: CreateOrderDto) {
//     const { userId, suscription } = order;
//     return this.orderService.addOrder(userId, suscription);
//   }

//   @Get()
//   @Get(':id')
//   getOrder(@Param('id', ParseUUIDPipe) id: string) {
//     return this.orderService.getOrder(id);
//   }

// @Patch(':id')
// update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
//   return this.orderService.update(+id, updateOrderDto);
// }

// @Delete(':id')
// remove(@Param('id') id: string) {
//   return this.orderService.remove(+id);
// }
