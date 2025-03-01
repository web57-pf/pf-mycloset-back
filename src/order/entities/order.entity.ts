import { OrderDetail } from 'src/order_detail/entities/order_detail.entity';
import { SubscriptionType } from 'src/suscription/entities/subscriptionType.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { status } from '../enum/order-status';

@Entity({
  name: 'order',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderDetail, (details) => details.order)
  details: OrderDetail[];

  @Column({default: status.PENDING})
  status: string

  @ManyToOne(
    () => SubscriptionType,
    (subscriptionType) => subscriptionType.orders,
  )
  subscriptionType: SubscriptionType;
}
