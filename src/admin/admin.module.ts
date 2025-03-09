import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { contanst } from 'src/auth/jwt.contanst';
import { OrderDetail } from 'src/order_detail/entities/order_detail.entity';

@Module({
  imports: [
    JwtModule.register({
        secret: contanst.secret,
        signOptions:{ expiresIn: '1h'}
    }),
    TypeOrmModule.forFeature([User, OrderDetail]),
    UsersModule,
    OrderDetail
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
