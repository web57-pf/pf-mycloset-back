import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import { CreateEmailDto } from './dto/create-email.dto';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASS);

    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Puedes usar otro servicio SMTP
      auth: {
        user: process.env.EMAIL_USER || 'henrypf057@gmail.com', // Usa variables de entorno
        pass: process.env.EMAIL_PASS || 'nljx irap njdg xrao', // Usa variables de entorno
      },
    });
  }

  private async sendEmail(dto: CreateEmailDto, templateName: string) {
    const { to, subject, html } = dto;

    // Renderizamos la plantilla Handlebars
    const templatePath = path.resolve(
      __dirname,
      'templates',
      `${templateName}.hbs`,
    );
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateSource);
    const htmlContent = compiledTemplate(dto); // Renderizamos el HTML con los datos del DTO

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to.join(','),
      subject,
      html: htmlContent, // Aquí usamos el HTML generado por Handlebars
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(
        `Correo de tipo "${templateName}" enviado a: ${to.join(', ')}`,
      );
    } catch (error) {
      console.error(
        `Error al enviar el correo de tipo "${templateName}":`,
        error,
      );
    }
  }

  async sendConfirmationEmail(dto: CreateEmailDto) {
    await this.sendEmail(dto, 'confirmation');
  }

  async sendEmailWelcome(dto: CreateEmailDto) {
    await this.sendEmail(dto, 'welcome');
  }

  async sendEmailResetPassword(dto: CreateEmailDto) {
    await this.sendEmail(dto, 'reset.password');
  }

  async sendEmailNotification(dto: CreateEmailDto) {
    await this.sendEmail(dto, 'notification');
  }

  async sendEmailConfirmSubscription(dto: CreateEmailDto) {
    await this.sendEmail(dto, 'subscription.confirm');
  }

  async sendEmailSubscription(dto: CreateEmailDto) {
    await this.sendEmail(dto, 'subscription');
  }

  async sendEmailCancellation(dto: CreateEmailDto) {
    await this.sendEmail(dto, 'cancel.subscription');
  }
}
