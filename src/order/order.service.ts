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
    let endDate: Date;

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
      startedAt: new Date(), // La fecha de inicio es el momento actual
      endsAt: endDate, // La fecha de fin es la calculada
    });

    await this.orderDetailRepository.save(orderDetail);

    try {
      const preference = await this.mercadopagoService.createPreference(
        Number(orderDto.price),
        newOrder.id,
        user.email,
      );
      const orderId = await this.orderRepository.findOne({
        where: { id: newOrder.id },
      });

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
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    order.status = newStatus === status.PAID ? status.PAID : status.NOT_PAID;

    await this.orderRepository.save(order);
    console.log('Order status in update:', order.status);
    return `Order with id ${orderId} has been updated to ${order.status}`;
  }

  async getOrdersExpiringIn24Hours(): Promise<Order[]> {
    const currentDate = new Date();
    const beforeDay = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // 24 horas antes

    //Busca las ordentes cuales terminan en 24 horas
    const orders = await this.orderRepository
      .createQueryBuilder('order')
      .innerJoin('order.details', 'detail')
      .where('order.Detail.endsat <= : beforeDay', { beforeDay })
      .andWhere('order.endsAt > :currentDate', { currentDate })
      .getMany();

    return orders;
  }

  // Luci
  /**
   * Seeder: Crea 200 órdenes ficticias para usuarios existentes.
   */
  async seedOrders(): Promise<{ message: string }> {
    // Obtener usuarios existentes
    const users = await this.userRepository.find();
    if (users.length === 0) {
      throw new NotFoundException('No hay usuarios para asignar las órdenes. Primero ejecuta el seeder de usuarios.');
    }

    // Función para generar una fecha aleatoria dentro del año actual
    const currentYear = new Date().getFullYear();
    const startDate = new Date(`${currentYear}-01-01`);
    const endDate = new Date(`${currentYear}-12-31`);
    const randomDate = (start: Date, end: Date): Date => {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    // Función para calcular la fecha de finalización según el tipo de suscripción
    const computeEndDate = (start: Date, subscriptionType: string): Date => {
      const end = new Date(start);
      if (subscriptionType === subsType.free) {
        end.setDate(end.getDate() + 7); // Ejemplo: periodo de prueba de 7 días
      } else if (subscriptionType === subsType.premium) {
        end.setMonth(end.getMonth() + 1);
      } else if (subscriptionType === subsType.pro) {
        end.setFullYear(end.getFullYear() + 1);
      }
      return end;
    };

    // Función para generar un precio aleatorio según el tipo de suscripción
    const randomPriceForSubscription = (subscriptionType: string): number => {
      if (subscriptionType === subsType.free) {
        return parseFloat((Math.random() * 50).toFixed(2));
      } else if (subscriptionType === subsType.premium) {
        return parseFloat((200 + Math.random() * 200).toFixed(2));
      } else if (subscriptionType === subsType.pro) {
        return parseFloat((400 + Math.random() * 200).toFixed(2));
      }
      return 0;
    };

    const subscriptionTypes = [subsType.free, subsType.premium, subsType.pro];

    // Crear 200 órdenes ficticias
    for (let i = 0; i < 200; i++) {
      // Seleccionar un usuario aleatorio
      const randomUser = users[Math.floor(Math.random() * users.length)];
      // Seleccionar aleatoriamente un tipo de suscripción para la orden (puede ser independiente del subscriptionType del usuario)
      const randomSubscription = subscriptionTypes[Math.floor(Math.random() * subscriptionTypes.length)];
      // Generar una fecha aleatoria para la orden
      const orderDate = randomDate(startDate, endDate);

      // Crear la orden
      const order = this.orderRepository.create({
        date: orderDate,
        user: randomUser,
        status: status.PENDING,
        subsType: randomSubscription,
      });
      const newOrder = await this.orderRepository.save(order);

      // Calcular la fecha de finalización y el precio
      const orderDetailStart = orderDate;
      const orderDetailEnd = computeEndDate(orderDetailStart, randomSubscription);
      const price = randomPriceForSubscription(randomSubscription);

      // Crear el detalle de la orden
      const orderDetail = this.orderDetailRepository.create({
        price,
        order: newOrder,
        startedAt: orderDetailStart,
        endsAt: orderDetailEnd,
      });

      await this.orderDetailRepository.save(orderDetail);
    }

    return { message: '200 órdenes ficticias creadas exitosamente.' };
  }

}
