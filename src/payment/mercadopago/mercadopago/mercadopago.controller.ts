import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';
import { OrderService } from 'src/order/order.service';
import { status } from 'src/order/enum/order-status';
import { UsersService } from 'src/users/users.service';
import { subsType } from 'src/users/enum/suscriptionType';
import e, { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';

@Controller('mercadopago')
export class MercadopagoController {
  constructor(
    private readonly mercadopagoService: MercadopagoService,
    private readonly ordersService: OrderService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  @Post('webhook')
  async webhook(@Body() body, @Res({ passthrough: true }) res: Response) {
    console.log('Webhook recibido:', body); // Verificar si los datos llegan correctamente
    try {
      if (body.type === 'payment') {
        console.log('Body id: ', body.data.id);
        console.log('Body:', body);
        const payment = await this.mercadopagoService.getPaymentById(
          body.data.id,
        );
        if (payment.status === 'approved') {
          const orderId = payment.external_reference;
          const order = await this.ordersService.getOrderById(orderId);
          if (!order) {
            throw new NotFoundException('Order not found');
          }
          await this.ordersService.updateStatus(order.id, status.PAID);
          console.log('Approved order:', order);
          const user = await this.userService.usersByEmail(
            payment.metadata.email,
          );
          if (['free', 'premium', 'pro'].includes(order.subsType)) {
            user.subscriptionType = order.subsType as subsType;
            console.log(
              'User subscription type in mpcontroller:',
              user.subscriptionType,
            );
            await this.userService.updateUser(user);

            //envio de mail de aprovación
            const emailDto = {
              email: user.email,
              subject: 'Subscripción aprobada',
              html: `<p>Hola ${user.name}, tu suscripción ha sido aprobada.</p>`,
              type: 'subscription.confirm',
            };

            const email =
              await this.emailService.sendEmailConfirmSubscription(emailDto);
            console.log(email);

            //Refres token
            const payload = {
              id: user.id,
              email: user.email,
              subscriptionType: user.subscriptionType,
              roles: user.isAdmin,
            };

            const newToken = this.jwtService.sign(payload);

            //Update cookie new token
            res.cookie('token', newToken, {
              httpOnly: true,
              secure: true,
              // sameSite: 'lax',
              sameSite: 'none',
              maxAge: 1000 * 60 * 60 * 24 * 1,
            });

            return { status: 'OK' };
          }
          //agregar relacion con mailer
        } else {
          console.log('Pago no aprobado');
          const orderId = payment.external_reference;
          await this.ordersService.updateStatus(orderId, status.NOT_PAID);
          const updatedOrder = await this.ordersService.getOrderById(orderId);
          console.log('Negative order: ', updatedOrder);
          //mailer cancelado

          //envio de mail de pago rechazado
          const emailDto = {
            email: payment.metadata.email,
            subject: 'Pago rechazado',
            html: `<p>Hola ${payment.metadata.name}, tu pago ha sido rechazado.</p>`,
            type: 'subscription.cancel',
          };
          const email = await this.emailService.sendEmailSubscription(emailDto);
          console.log(email);
        }
      }
      return { status: 'OK' };
    } catch (error) {
      console.error('Error al procesar el webhook:', error);
      throw new HttpException(
        'Error al procesar el pago',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('success')
  async success(@Query() queries) {
    const paymentId = queries.payment_id;
    const payment = await this.mercadopagoService.getPaymentById(paymentId);

    if (payment.status === 'approved') {
      const orderId = payment.external_reference;
      await this.ordersService.updateStatus(orderId, status.PAID);
      const updatedOrder = await this.ordersService.getOrderById(orderId);
      console.log('Updated order in success: ', updatedOrder);
      return { message: 'Suscripción aprobada' };
    } else {
      return { message: 'Suscripción no aprobada' };
    }
  }
  // @Get('failure')
  // async failure(@Query() queries){
  //     return { message: 'El pago falló. Vuelva a intentar.' }
  // }
}
