import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { OrderDetail } from 'src/order_detail/entities/order_detail.entity';
import { status } from './enum/order-status';
import { MercadopagoService } from 'src/payment/mercadopago/mercadopago/mercadopago.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { subsPrice } from 'src/users/enum/suscriptionType';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    private mercadopagoService: MercadopagoService
  ) {}

  async getOrders(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['details'] });
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async addOrder(orderDto: CreateOrderDto
  ): Promise<Order> {
    let totalPrice = 0;
    const userId = orderDto.userId
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    const order = new Order();
    order.date = new Date();
    order.user = user;
    order.status = status.PENDING
    order.subsType = orderDto.preferedSub
    
    totalPrice = subsPrice[orderDto.preferedSub]
    const newOrder = await this.orderRepository.save(order);
    
    const orderDetail = new OrderDetail();
    orderDetail.price = Number(totalPrice.toFixed(2));
    orderDetail.order = newOrder;
    orderDetail.startedAt = new Date()
    orderDetail.endsAt = new Date()
    
    await this.orderDetailRepository.save(orderDetail);
    
    const foundOrder = await this.orderRepository.findOne({where:
      {id: newOrder.id}
    })
    if (!foundOrder) {
      throw new NotFoundException(`Order with id ${newOrder.id} not found`);
    }
    const preference = await this.mercadopagoService.createPreference(totalPrice, order.id, user.email)
    console.log(preference)
    return foundOrder;
  }

  async updateStatus(orderid: string, newStatus: string){
    const getOrder = await this.orderRepository.findOne({where:{id: orderid}})
    if(!getOrder){
      throw new NotFoundException(`Order with ID ${orderid} not found`)
    }
    if(newStatus === status.PAID){
      getOrder.status = status.PAID
    } else{
      getOrder.status = status.NOT_PAID
    }
    await this.orderRepository.save(getOrder)

    return `Order with id ${orderid} has been updated to ${newStatus}`
  }

}
