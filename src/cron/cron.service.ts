import * as cron from 'node-cron';
import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from 'src/email/dto/create-email.dto';
import { EmailService } from 'src/email/email.service';
import { OrderService } from 'src/order/order.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CronJobService {
  constructor(
    private readonly emailService: EmailService,
    private readonly orderService: OrderService,
    private readonly userService: UsersService,
  ) {}

  // Método para ejecutar el cron job
  sendSubscriptionReminderEmails() {
    cron.schedule('0 0 * * *', async () => {
      // Esto se ejecuta todos los días a las 12 AM
      console.log('Enviando recordatorios de suscripción...');

      // Obtener las órdenes que vencen dentro de 24 horas
      const ordersToExpire =
        await this.orderService.getOrdersExpiringIn24Hours();

      for (const order of ordersToExpire) {
        // Obtener el usuario de la orden
        const user = await this.userService.findOne(order.id);

        // Crear el DTO para el correo de expiración
        const emailDto: CreateEmailDto = {
          to: [user.email], // Dirección del usuario
          subject: 'Tu suscripción está por vencer',
          html: `
            <p>Estimado/a ${user.name},</p>
            <p>Tu suscripción al plan ${order.subsType} está por vencer en 24 horas. ¡Renovála ahora!</p>
          `,
          type: 'subscription', // Usamos el tipo 'subscription' para indicar que es un recordatorio de suscripción
        };

        // Enviar el correo de recordatorio usando el servicio de correo
        await this.emailService.sendEmailSubscription(emailDto);
      }
    });
  }
}
