import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobService } from './cron.service';

import { EmailModule } from 'src/email/email.module';
import { OrderModule } from 'src/order/order.module';
import { UsersModule } from 'src/users/users.module';
import { EmailService } from 'src/email/email.service';
import { OrderService } from 'src/order/order.service';
import { UsersService } from 'src/users/users.service';
import { CronJobController } from './cron.controller';

@Module({
  imports: [ScheduleModule, EmailModule, OrderModule, UsersModule],
  controllers: [CronJobController],
  providers: [CronJobService],
})
export class CronModule {}
