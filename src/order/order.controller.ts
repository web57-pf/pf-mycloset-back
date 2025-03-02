import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Creación de orden' })
  @ApiBody({ type: CreateOrderDto })
  @Post()
  async create(@Body() order: CreateOrderDto) {
    return await this.orderService.addOrder(order)
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

  @Put(':orderId')
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body('status') status: string,
  ) {
    return await this.updateOrderStatus(orderId, status)
  }
}
