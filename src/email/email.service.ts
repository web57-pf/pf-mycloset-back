import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmationEmail(user: string, email: string) {
    const url = `http://localhost:3000/auth/confirm`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirm your email',
      template: './confirmation',
      context: {
        name: user,
        url,
      },
    });
  }

  async sendWelcomeEmail(user: string, email: string) {
    const url = `http://localhost:3000/auth/login`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to our app',
      template: './welcome.email',
      context: {
        name: user,
        url,
      },
    });
  }

  async sendResetPasswordEmail(user: string, email: string) {
    const url = `http://localhost:3000/auth/reset-password`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset your password',
      template: './reset.password',
      context: {
        name: user,
        url,
      },
    });
  }

  async sendSubscriptionEmail(user: string, email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Subscription Confirmation',
      template: './subscription.confirm',
      context: {
        name: user,
      },
    });
  }

  async sendCancellationEmail(user: string, email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'cancel.email',
      template: './cancel',
      context: {
        name: user,
      },
    });
  }

  async sendCancelSubscriptionEmail(user: string, email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Subscription Cancellation',
      template: './cancel.subscription',
      context: {
        name: user,
      },
    });
  }
}
