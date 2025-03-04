import { Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
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
    async webhook(@Query() queries){
        console.log(queries)
        try {
            if(queries.type === 'payment'){
                const payment = await this.mercadopagoService.getPaymentById(
                    queries['data.id'],
                )
                if(payment.status==='approved'){
                    const orderId = payment.metadata.orderId
                    await this.ordersService.updateStatus(orderId, status.PAID)
                    const order = await this.ordersService.getOrderById(orderId)
                    const user = await this.userService.usersByEmail(payment.metadata.email)
                    if(['free', 'premium', 'pro'].includes(order.subsType)){
                        user.subscriptionType = order.subsType as subsType
                        await this.userService.updateUser(user)
                    }
                    //agregar relacion con mailer
                } else{
                    console.log('No aprobado')
                    const orderId = payment.metadata.orderId
                    await this.ordersService.updateStatus(orderId, status.NOT_PAID)
                    //mailer cancelado
                }
            }
            return {status: 'OK'}
        } catch (error) {
            throw new HttpException('Error al procesar el pago',
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
    }
    @Get('success')
    async success(@Query()queries){
        const paymentId = queries.payment_id
        const payment = await this.mercadopagoService.getPaymentById(paymentId)

        if (payment.status === 'approved') {
            const orderId = payment.metadata.orderId
            await this.ordersService.updateStatus(orderId, status.PAID)
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
