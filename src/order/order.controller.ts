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

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create order' })
  @ApiBody({ type: CreateOrderDto })
  @Post()
  create(@Body() order: CreateOrderDto & { subscription: SubscriptionType[] }) {
    const { userId, subscription } = order;
    return this.orderService.addOrder(userId, subscription);
  }

  @Get()
  @Get(':id')
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.getOrders(id);
  }
}
