import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { OrderDetail } from 'src/order_detail/entities/order_detail.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { MercadopagoService } from 'src/payment/mercadopago/mercadopago/mercadopago.service';
import { JwtModule } from '@nestjs/jwt';
import { contanst } from 'src/auth/jwt.contanst';

@Module({
  imports: [
    JwtModule.register({
          secret: contanst.secret,
          signOptions:{ expiresIn: '1h'}
    }),
    TypeOrmModule.forFeature([Order, User, OrderDetail]),
    
  ],
  controllers: [OrderController],
  providers: [OrderService, MercadopagoService],
  exports: [OrderService]
})
export class OrderModule {}
