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

        if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
            throw new BadRequestException('El precio debe ser un número positivo.');
          }

        const items = [{
            id: 'suscripcion-mycloset',
            title: 'Suscripción mycloset',
            quantity: 1,
            unit_price: Number(amount.toFixed(2))
        }]
        try {
            const response = await this.preference.create({
                body: {
                    items,
                    back_urls: {
                        success: 'https://mycloset57.vercel.app/accepted',
                        failure: 'https://mycloset57.vercel.app/denied'
                    },
                    notification_url: 'https://pf-mycloset-back.onrender.com/mercadopago/webhook',
                    external_reference: orderId,
                    metadata: {
                        email
                    }
                }
            })
            return response
            
        } catch (error) {
            console.log(error)
            throw new BadRequestException('No se pudo crear la preferencia de pago.')
        }
    }

    async getPaymentById(id: string){
        try{
            const payment = await this.payment.get({
                id: id
            });
            const status = payment.status
            const status_detail = payment.status_detail
            const metadata = payment.metadata
            const external_reference = payment.external_reference
            // const {status, status_detail, metadata} = payment
            return {status, status_detail, metadata, external_reference}
        } catch(error) {
            throw new BadRequestException('Error al obtener el pago')
        }
    }
}