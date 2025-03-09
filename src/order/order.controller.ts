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
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Creación de orden' })
  @ApiBody({ type: CreateOrderDto })
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Post()
  async create(@Body() order: CreateOrderDto) {
    return await this.orderService.addOrder(order)
  }
  @ApiOperation({ summary: 'Obtener todas las ordenes' })
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Get()
  getOrders() {
    return this.orderService.getOrders();
  }

  @ApiOperation({ summary: 'Obtener order por id' })
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Get(':id')
  async getOrderById(@Param('id', ParseUUIDPipe) id: string) {
    const order = await this.orderService.getOrderById(id); 
    return order
  }

  @ApiOperation({ summary: 'Actualizar el estado de la orden' })
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Put(':orderId')
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body('status') status: string,
  ) {
    return await this.updateOrderStatus(orderId, status)
  }
}
