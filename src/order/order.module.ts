import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { OrderDetail } from 'src/order_detail/entities/order_detail.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { MercadopagoService } from 'src/payment/mercadopago/mercadopago/mercadopago.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User, OrderDetail]),
  ],
  controllers: [OrderController],
  providers: [OrderService, MercadopagoService],
})
export class OrderModule {}
