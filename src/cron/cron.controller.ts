import { Controller, Get } from '@nestjs/common';
import { CronJobService } from './cron.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('cron')
export class CronJobController {
  constructor(private readonly cronJobService: CronJobService) {}

  @ApiOperation({ summary: 'Envío de recordatorios de suscripción' })
  @Get('send-subscription-reminders')
  async sendSubscriptionReminders() {
    await this.cronJobService.sendSubscriptionReminderEmails();
    return { message: 'Recordatorio de suscripción enviado' };
  }
}
