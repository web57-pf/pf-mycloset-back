import { Order } from 'src/order/entities/order.entity';
import { OrderDetail } from 'src/order_detail/entities/order_detail.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'subscriptionType',
})
export class SubscriptionType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  SubscriptionType: string;

  @Column()
  price: number;

  @Column()
  durationDayTimes: number;

  @OneToMany(() => User, (user) => user.subscriptionType)
  users: User[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.subscriptionType)
  orderDetails: OrderDetail[];

  @OneToMany(() => Order, (order) => order.subscriptionType)
  orders: Order[];
}
