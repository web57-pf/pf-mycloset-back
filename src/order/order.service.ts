import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { SubscriptionType } from 'src/suscription/entities/subscriptionType.entity';
import { OrderDetail } from 'src/order_detail/entities/order_detail.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(SubscriptionType)
    private suscriptionRepository: Repository<SubscriptionType>,
  ) {}

  async getOrders(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        details: {
          subscriptionType: true,
        },
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async addOrder(
    userId: string,
    subscription: SubscriptionType[],
  ): Promise<Order> {
    let totalPrice = 0;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    const order = new Order();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.orderRepository.save(order);

    const subscriptionArray: SubscriptionType[] = await Promise.all(
      subscription.map(async (subscription) => {
        const buySubscription = await this.suscriptionRepository.findOne({
          where: { id: subscription.id },
        });
        if (!buySubscription) {
          throw new NotFoundException(
            `Subscription with id ${subscription.id} not found`,
          );
        }
        totalPrice += Number(buySubscription.price);

        await this.suscriptionRepository.update(
          { id: subscription.id },
          { durationDayTimes: buySubscription.durationDayTimes },
        );
        return buySubscription;
      }),
    );
    const orderDetail = new OrderDetail();
    orderDetail.price = Number(totalPrice.toFixed(2));
    orderDetail.subscriptionType = subscriptionArray[0];
    orderDetail.order = newOrder;

    await this.orderDetailRepository.save(orderDetail);

    const saveOrder = await this.orderRepository.findOne({
      relations: {
        details: {
          subscriptionType: true,
        },
      },
      where: { id: newOrder.id },
    });
    if (!saveOrder) {
      throw new NotFoundException(`Order with id ${newOrder.id} not found`);
    }
    return saveOrder;
  }
}
