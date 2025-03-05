import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { AuthenticationGuard } from 'src/auth/guards/auth.guard';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Creación de orden' })
  @ApiBody({ type: CreateOrderDto })
  @UseGuards(AuthenticationGuard)
  @Post()
  async create(@Body() order: CreateOrderDto) {
    return await this.orderService.addOrder(order)
  }
  @ApiOperation({ summary: 'Obtener todas las ordenes' })
  @Get()
  getOrders() {
    return this.orderService.getOrders();
  }

  @ApiOperation({ summary: 'Obtener order por id' })
  @Get(':id')
  async getOrderById(@Param('id', ParseUUIDPipe) id: string) {
    const order = await this.orderService.getOrderById(id); 
    return order
  }

  @Put(':orderId')
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body('status') status: string,
  ) {
    return await this.updateOrderStatus(orderId, status)
  }
}
