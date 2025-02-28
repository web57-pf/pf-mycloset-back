import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { SubscriptionType } from 'src/suscription/entities/subscriptionType.entity';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Creación de orden' })
  @ApiBody({ type: CreateOrderDto })
  @Post()
  create(@Body() order: CreateOrderDto & { subscription: SubscriptionType[] }) {
    const { userId, subscription } = order;
    return this.orderService.addOrder(userId, subscription);
  }
  @ApiOperation({ summary: 'Obtener todas las ordenes' })
  @Get()
  getOrders() {
    return this.orderService.getOrders();
  }

  @ApiOperation({ summary: 'Obtener todas las ordenes' })
  @Get(':id')
  getOrderById(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.getOrderById(id);
  }
}
