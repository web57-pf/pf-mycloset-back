import { Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Post, Query } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';
import { OrderService } from 'src/order/order.service';
import { status } from 'src/order/enum/order-status';
import { UsersService } from 'src/users/users.service';
import { subsType } from 'src/users/enum/suscriptionType';

@Controller('mercadopago')
export class MercadopagoController {
    constructor(
        private readonly mercadopagoService: MercadopagoService,
        private readonly ordersService: OrderService,
        private readonly userService: UsersService
        //relacion mailer
    ){}

    @Post('webhook')
    async webhook(@Body() body) {
        console.log('Webhook recibido:', body); // Verificar si los datos llegan correctamente
        try {
            if (body.type === 'payment') {
                console.log('Body id: ', body.data.id)
                console.log('Body:', body)
                const payment = await this.mercadopagoService.getPaymentById(
                    body['data.id'],
                );
                if (payment.status === 'approved') {
                    const orderId = payment.external_reference
                    const order = await this.ordersService.getOrderById(orderId);
                    if(!order){
                        throw new NotFoundException('Order not found')
                    }
                    await this.ordersService.updateStatus(order.id, status.PAID);
                    console.log('Approved order:', order)
                    const user = await this.userService.usersByEmail(payment.metadata.email);
                    if (['free', 'premium', 'pro'].includes(order.subsType)) {
                        user.subscriptionType = order.subsType as subsType;
                        console.log('User subscription type in mpcontroller:',user.subscriptionType)
                        await this.userService.updateUser(user);
                    }
                    //agregar relacion con mailer
                } else {
                    console.log('Pago no aprobado');
                    const orderId = payment.external_reference
                    await this.ordersService.updateStatus(orderId, status.NOT_PAID);
                    const updatedOrder = await this.ordersService.getOrderById(orderId)
                    console.log('Negative order: ',updatedOrder)
                    //mailer cancelado
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
    async success(@Query()queries){
        const paymentId = queries.payment_id
        const payment = await this.mercadopagoService.getPaymentById(paymentId)

        if (payment.status === 'approved') {
            const orderId = payment.external_reference
            await this.ordersService.updateStatus(orderId, status.PAID)
            const updatedOrder = await this.ordersService.getOrderById(orderId)
            console.log('Updated order in success: ', updatedOrder)
            return {message: 'Suscripción aprobada'}
        } else {
            return { message: 'Suscripción no aprobada'}
        }
    }
    // @Get('failure')
    // async failure(@Query() queries){
    //     return { message: 'El pago falló. Vuelva a intentar.' }
    // }
}
