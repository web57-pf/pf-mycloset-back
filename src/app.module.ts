import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDataSourceConfig } from './config/data-source';
import { ClothesModule } from './clothes/clothes.module';
// import { FileUploadModule } from './file-upload/file-upload.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CombinationsModule } from './combinations/combinations.module';
import { TagsModule } from './tags/tags.module';
import { MercadopagoModule } from './payment/mercadopago/mercadopago/mercadopago.module';
import { JwtModule } from '@nestjs/jwt';
import { contanst } from './auth/jwt.contanst';
import { AdminModule } from './admin/admin.module';
import { OrderModule } from './order/order.module';
import { EmailModule } from './email/email.module';
import { WeatherModule } from './weather/weather.module';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [PostgresDataSourceConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('postgres'),
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    CategoryModule,
    OrderModule,
    // FileUploadModule,
    AuthModule,
    ClothesModule,
    MercadopagoModule,
    CombinationsModule,
    TagsModule,
    WeatherModule,
    AdminModule,
    EmailModule,
    CronModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
