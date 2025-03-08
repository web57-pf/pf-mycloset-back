import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { CreateEmailDto } from './dto/create-email.dto';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  emailTransporter() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
    return transporter;
  }

  async sendConfirmationEmail(dto: CreateEmailDto) {
    const { to, subject, template, html } = dto;

    const transport = this.emailTransporter();

    const options: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('MAIL_FROM'),
      to: to,
      subject: subject,
      text: template,
      html: html,
    };
    try {
      await transport.sendMail(options);
      console.log('Correo de confirmación enviado correctamente');
    } catch (error) {
      console.log('Error al enviar el correo de confirmación', error);
    }
  }

  async sendEmailWelcome(dto: CreateEmailDto) {
    const { to, subject, template, html } = dto;

    const transport = this.emailTransporter();

    const options: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('MAIL_FROM'),
      to: to,
      subject: subject,
      text: template,
      html: html,
    };
    try {
      await transport.sendMail(options);
      console.log('Correo de bienvenida enviado correctamente');
    } catch (error) {
      console.log('Error al enviar el correo de bienvenida', error);
    }
  }

  async sendEmailResetPassword(dto: CreateEmailDto) {
    const { to, subject, template, html } = dto;

    const transport = this.emailTransporter();

    const options: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('MAIL_FROM'),
      to: to,
      subject: subject,
      text: template,
      html: html,
    };
    try {
      await transport.sendMail(options);
      console.log(
        'Correo de restablecimiento de contraseña enviado correctamente',
      );
    } catch (error) {
      console.log(
        'Error al enviar el correo de restablecimiento de contraseña',
        error,
      );
    }
  }

  async sendEmailSubscription(dto: CreateEmailDto) {
    const { to, subject, template, html } = dto;

    const transport = this.emailTransporter();

    const options: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('MAIL_FROM'),
      to: to,
      subject: subject,
      text: template,
      html: html,
    };
    try {
      await transport.sendMail(options);
      console.log('Correo de suscripción enviado correctamente');
    } catch (error) {
      console.log('Error al enviar el correo de suscripción', error);
    }
  }

  async sendEmailCancellation(dto: CreateEmailDto) {
    const { to, subject, template, html } = dto;

    const transport = this.emailTransporter();

    const options: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('MAIL_FROM'),
      to: to,
      subject: subject,
      text: template,
      html: html,
    };
    try {
      await transport.sendMail(options);
      console.log('Correo de cancelación enviado correctamente');
    } catch (error) {
      console.log('Error al enviar el correo de cancelación', error);
    }
  }

  async sendEmailNotification(dto: CreateEmailDto) {
    const { to, subject, template, html } = dto;

    const transport = this.emailTransporter();

    const options: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('MAIL_FROM'),
      to: to,
      subject: subject,
      text: template,
      html: html,
    };
    try {
      await transport.sendMail(options);
      console.log('Correo de notificación enviado correctamente');
    } catch (error) {
      console.log('Error al enviar el correo de notificación', error);
    }
  }

  async sendEmailConfirmSubscription(dto: CreateEmailDto) {
    const { to, subject, template, html } = dto;

    const transport = this.emailTransporter();

    const options: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('MAIL_FROM'),
      to: to,
      subject: subject,
      text: template,
      html: html,
    };
    try {
      await transport.sendMail(options);
      console.log(
        'Correo de confirmación de suscripción enviado correctamente',
      );
    } catch (error) {
      console.log(
        'Error al enviar el correo de confirmación de suscripción',
        error,
      );
    }
  }
}
