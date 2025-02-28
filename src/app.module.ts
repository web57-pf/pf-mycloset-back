import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
// import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { SuscriptionModule } from './suscription/suscription.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDataSourceConfig } from './config/data-source';
import { ClothesModule } from './clothes/clothes.module';
import { OrderDetailModule } from './order_detail/order_detail.module';

import { EmailModule } from './email/email.module';
// import { FileUploadModule } from './file-upload/file-upload.module';
import { ScheduleModule } from '@nestjs/schedule';
// import { CronModule } from './cron/cron.module';
import { OrderModule } from './order/order.module';

import { CombinationsModule } from './combinations/combinations.module';
import { TagsModule } from './tags/tags.module';


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
    SuscriptionModule,
    ClothesModule,
    OrderDetailModule,

    EmailModule,
    // CronModule,

    CombinationsModule,
    TagsModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
