import { Module } from '@nestjs/common';
import { SuscriptionService } from './suscription.service';
import { SuscriptionController } from './suscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { SubscriptionType } from './entities/subscriptionType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, SubscriptionType])],
  controllers: [SuscriptionController],
  providers: [SuscriptionService],
})
export class SuscriptionModule {}
