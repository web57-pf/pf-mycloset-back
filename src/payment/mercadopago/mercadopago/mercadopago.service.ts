import { BadRequestException, Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';

@Injectable()
export class MercadopagoService {
    private client: MercadoPagoConfig;
    private preference: Preference;
    private payment: Payment
    constructor(){
        this.client = new MercadoPagoConfig({
            accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
            options: {
                timeout: 5000
            }
        })
        this.payment = new Payment(this.client)
        this.preference = new Preference(this.client)
    }

    async createPreference(amount: number, orderId: string, email: string){
        const items = [{
            id: 'suscripcion-mycloset',
            title: 'Suscripción mensual mycloset',
            quantity: 1,
            unit_price: amount
        }]
        try {
            const response = await this.preference.create({
                body: {
                    items,
                    back_urls: {
                        success: '',
                        failure: ''
                    },
                    notification_url: '',
                    metadata: {
                        orderId,
                        email
                    }
                }
            })
            return response
            
        } catch (error) {
            throw new BadRequestException('No se pudo crear la preferencia de pago.')
        }
    }

    async getPaymentById(id: string){
        try{
            const {status, status_detail, metadata} = await this.payment.get({
                id: id
            })
            return {status, status_detail, metadata}
        } catch(error) {
            throw new BadRequestException('Error al obtener el pago')
        }
    }
}