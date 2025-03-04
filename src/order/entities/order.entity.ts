import { OrderDetail } from 'src/order_detail/entities/order_detail.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { status } from '../enum/order-status';
import { subsType } from 'src/users/enum/suscriptionType';

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

  @Column({
    type: 'enum',
    enum: subsType,
    default: subsType.free,
  })
  subsType: string
}
