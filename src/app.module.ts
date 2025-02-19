import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { SuscriptionModule } from './suscription/suscription.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDataSourceConfig } from './config/data-source';
import { ClothesModule } from './clothes/clothes.module';
import { OrderDetailModule } from './order_detail/order_detail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [PostgresDataSourceConfig]}),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('postgres'),
    }),
    UsersModule,
    CategoryModule,
    OrderModule,
    AuthModule,
    SuscriptionModule,
    ClothesModule,
    OrderDetailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
