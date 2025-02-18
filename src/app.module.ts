import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { AuthModule } from './auth/auth.module';
import { CombinationsModule } from './combinations/combinations.module';
import { SuscriptionModule } from './suscription/suscription.module';

@Module({
  imports: [
    UsersModule,
    CategoryModule,
    OrderModule,
    OrderDetailModule,
    AuthModule,
    CombinationsModule,
    SuscriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
