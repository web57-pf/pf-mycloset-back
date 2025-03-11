import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import * as path from 'path';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import { CreateEmailDto } from './dto/create-email.dto';

@Injectable()
export class EmailService {
  constructor() {
    if (!process.env.SENDGRID_API_KEY || !process.env.MAIL_FROM) {
      console.error(
        '⚠️ Error: Las variables de entorno SENDGRID_API_KEY y MAIL_FROM no están definidas.',
      );
      throw new InternalServerErrorException(
        'Configuración de correo no encontrada.',
      );
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('✅ Servicio de correo inicializado correctamente.');
  }

  private async sendEmail(dto: CreateEmailDto, templateName: string) {
    const { email, subject } = dto;

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
      to: dto.email,
      from: { email: 'henrypf057@gmail.com', name: 'My Closet' },
      subject,
      html: htmlContent, // Aquí usamos el HTML generado por Handlebars
    };

    try {
      await sgMail.send(mailOptions);
      console.log(`Correo de tipo "${templateName}" enviado a: ${email}`);
    } catch (error) {
      console.error(
        console.error(
          'Error al enviar el correo:',
          error.response?.body || error,
        ),
        console.error(
          'Detalles del error:',
          JSON.stringify(error.response?.body.errors, null, 2),
        ),
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
