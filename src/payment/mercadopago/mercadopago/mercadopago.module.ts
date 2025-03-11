import { Module } from '@nestjs/common';
import { MercadopagoController } from './mercadopago.controller';
import { MercadopagoService } from './mercadopago.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { User } from 'mercadopago';
import { OrderService } from 'src/order/order.service';
import { UsersService } from 'src/users/users.service';
import { OrderModule } from 'src/order/order.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { contanst } from 'src/auth/jwt.contanst';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    JwtModule.register({
      secret: contanst.secret,
      signOptions: { expiresIn: '1h' },
    }),
    OrderModule,
    UsersModule,
  ],
  controllers: [MercadopagoController],
  providers: [MercadopagoService, EmailService],
  exports: [MercadopagoService],
})
export class MercadopagoModule {}
