import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
  @Cron('* * * * * *')
  handleCron() {
    console.log('Called when the current second is 42');
  }
}
