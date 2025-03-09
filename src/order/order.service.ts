import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { OrderDetail } from 'src/order_detail/entities/order_detail.entity';
import { status } from './enum/order-status';
import { MercadopagoService } from 'src/payment/mercadopago/mercadopago/mercadopago.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { subsPrice, subsType } from 'src/users/enum/suscriptionType';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    private mercadopagoService: MercadopagoService,
  ) {}

  async getOrders(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['details'] });
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['details'],
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async addOrder(orderDto: CreateOrderDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: orderDto.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${orderDto.userId} not found`);
    }

    // const totalPrice = subsPrice[orderDto.preferedSub] ?? 0;

    const order = this.orderRepository.create({
      date: new Date(),
      user,
      status: status.PENDING,
      subsType: orderDto.preferedSub as subsType,
    });

    const newOrder = await this.orderRepository.save(order);

    const now = new Date();
    let endDate: Date

    if (orderDto.preferedSub === 'premium') {
      // Si es premium, la fecha de finalización es un mes después
      endDate = new Date(now.setMonth(now.getMonth() + 1));
    } else if (orderDto.preferedSub === 'pro') {
      // Si es pro, la fecha de finalización es un año después
      endDate = new Date(now.setFullYear(now.getFullYear() + 1));
    } else {
      // Si el tipo no es reconocido, podrías lanzar un error o asignar un valor por defecto
      throw new BadRequestException('Invalid subscription type');
    }

    // Crear el detalle de la orden con las fechas correctas
    const orderDetail = this.orderDetailRepository.create({
      price: Number(orderDto.price),
      order: newOrder,
      startedAt: new Date(),  // La fecha de inicio es el momento actual
      endsAt: endDate,        // La fecha de fin es la calculada
    });

    await this.orderDetailRepository.save(orderDetail);

    try {
      const preference = await this.mercadopagoService.createPreference(
        Number(orderDto.price),
        newOrder.id,
        user.email,
      );
      const orderId = await this.orderRepository.findOne({where:{id: newOrder.id}})
      
      return {
        order: orderId,
        initPoint: preference.init_point,
    };
      
      // console.log('MercadoPago Preference:', preference);
    } catch (error) {
      throw new HttpException(
        'Error al crear la preferencia de pago',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    // return this.getOrderById(newOrder.id); // Traer la orden con las relaciones
  }

  async updateStatus(orderId: string, newStatus: string): Promise<string> {
    const order = await this.orderRepository.findOne({ where: { id: orderId } });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    order.status =
      newStatus === status.PAID ? status.PAID : status.NOT_PAID;

    await this.orderRepository.save(order);
    console.log('Order status in update:', order.status)
    return `Order with id ${orderId} has been updated to ${order.status}`;
  }
}
