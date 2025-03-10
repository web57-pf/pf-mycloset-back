// import { Body, Controller, Post } from '@nestjs/common';
// import { EmailService } from './email.service';
// import { CreateEmailDto } from './dto/create-email.dto';
// import { ApiOperation } from '@nestjs/swagger';

// @Controller('email')
// export class EmailController {
//   constructor(private readonly emailService: EmailService) {}

//   @ApiOperation({ summary: 'Enviar email' })
//   @Post('send')
//   async sendEmail(@Body() dto: CreateEmailDto) {
//     console.log('dto', dto);

//     switch (dto.type) {
//       case 'confirmation':
//         await this.emailService.sendConfirmationEmail(dto);
//         break;
//       case 'welcome':
//         await this.emailService.sendEmailWelcome(dto);
//         break;
//       case 'reset.password':
//         await this.emailService.sendEmailResetPassword(dto);
//         break;
//       case 'notification':
//         await this.emailService.sendEmailNotification(dto);
//         break;
//       case 'confirm':
//         await this.emailService.sendEmailConfirmSubscription(dto);
//         break;
//       case 'subscription.confirm':
//         await this.emailService.sendEmailSubscription(dto);
//         break;
//       case 'cancel.subscription':
//         await this.emailService.sendEmailCancellation(dto);
//         break;
//       default:
//         throw new Error('Invalid email type');
//     }
//     return { message: 'Email sent' };
//   }
// }
