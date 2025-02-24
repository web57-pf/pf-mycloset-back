// import { Injectable, NotFoundException } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { Order } from './entities/order.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from 'src/users/entities/user.entity';
// import { SubscriptionType } from 'src/suscription/entities/subscriptionType.entity';
// import { OrderDetail } from 'src/order_detail/entities/order_detail.entity';

// @Injectable()
// export class OrderService {
//   constructor(
//     @InjectRepository(Order)
//     private orderRepository: Repository<Order>,
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//     @InjectRepository(OrderDetail)
//     private orderDetailRepository: Repository<OrderDetail>,
//     @InjectRepository(SubscriptionType)
//     private suscriptionRepository: Repository<SubscriptionType>,
//   ) {}

//   async getOrder(id: string): Promise<Order> {
//     const order = await this.orderRepository.findOne({
//       where: { id },
//       relations: {
//         details: {
//           order: true,
//         },
//       },
//     });
//     if (!order) {
//       throw new NotFoundException('Order not found');
//     } else {
//       return await this.getOrder(id);
//     }
//   }
//   async addOrder(id: string, order: Order): Promise<Order> {
//     const user = await this.userRepository.findOne(id);
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }
//     const subscription = await this.suscriptionRepository.findOne(
//       order.subscriptionType,
//     );
//     if (!subscription) {
//       throw new NotFoundException('Subscription not found');
//     }
//     order.user = user;
//     order.subscriptionType = subscription;
//     return this.orderRepository.save(order);
//   }
// }
