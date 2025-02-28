import { Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadopagoController {
    constructor(
        private readonly mercadopagoService: MercadopagoService
        // private readonly ordersService: OrdersService
        //relacion mailer
    ){}

    @Post('webhook')
    async webhook(@Query() queries){
        try {
            if(queries.type === 'payment'){
                const payment = await this.mercadopagoService.getPaymentById(
                    queries['data.id'],
                )
                if(payment.status==='approved'){
                    const orderId = payment.metadata.orderId
                    //agregar relacion con ordersService 
                    //agregar relacion con mailer
                } else{
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

        if (payment.status = 'approved') {
            const orderId = payment.metadata.orderId
            //relacion orders
            return {message: 'Suscripción aprobada'}
        } else {
            return { message: 'Suscripción no aprobada'}
        }
    }
    @Get('failure')
    async failure(@Query() queries){
        return {message: 'El pago falló. Vuelva a intentar.'}
    }
}
