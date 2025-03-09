// import { Body, Controller, Post } from '@nestjs/common';
// import { EmailService } from './email.service';
// import { CreateEmailDto } from './dto/create-email.dto';

// @Controller('email')
// export class EmailController {
//   constructor(private readonly emailService: EmailService) {}

//   @Post('send')
//   async sendEmail(@Body() dto: CreateEmailDto) {
//     await this.emailService.sendConfirmationEmail(dto);
//     return { message: 'Email sent' };
//   }

//   @Post('send-welcome')
//   async sendEmailWelcome(@Body() dto: CreateEmailDto) {
//     await this.emailService.sendEmailWelcome(dto);
//     return { message: 'Email sent' };
//   }

//   @Post('send-reset-password')
//   async sendResetPassword(@Body() dto: CreateEmailDto) {
//     await this.emailService.sendEmailResetPassword(dto);
//     return { message: 'Email sent' };
//   }

//   @Post('send-Notification')
//   async sendNotification(@Body() dto: CreateEmailDto) {
//     await this.emailService.sendEmailNotification(dto);
//     return { message: 'Email sent' };
//   }

//   @Post('send-activation')
//   async sendActivation(@Body() dto: CreateEmailDto) {
//     await this.emailService.sendEmailConfirmSubscription(dto);
//     return { message: 'Email sent' };
//   }

//   @Post('send-subscription')
//   async sendSubscription(@Body() dto: CreateEmailDto) {
//     await this.emailService.sendEmailSubscription(dto);
//     return { message: 'Email sent' };
//   }

//   @Post('send-cancel-subscription')
//   async sendCancelSubscription(@Body() dto: CreateEmailDto) {
//     await this.emailService.sendEmailCancellation(dto);
//     return { message: 'Email sent' };
//   }
// }

import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() dto: CreateEmailDto) {
    switch (dto.type) {
      case 'confirmation':
        await this.emailService.sendConfirmationEmail(dto);
        break;
      case 'welcome':
        await this.emailService.sendEmailWelcome(dto);
        break;
      case 'reset.password':
        await this.emailService.sendEmailResetPassword(dto);
        break;
      case 'notification':
        await this.emailService.sendEmailNotification(dto);
        break;
      case 'confirm':
        await this.emailService.sendEmailConfirmSubscription(dto);
        break;
      case 'subscription.confirm':
        await this.emailService.sendEmailSubscription(dto);
        break;
      case 'cancel.subscription':
        await this.emailService.sendEmailCancellation(dto);
        break;
      default:
        throw new Error('Invalid email type');
    }
    return { message: 'Email sent' };
  }
}
