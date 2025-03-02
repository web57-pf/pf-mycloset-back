import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'order-detail',
})
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startedAt: Date;

  @Column()
  endsAt: Date

  @Column()
  price: number;

  @ManyToOne(() => Order, (order) => order.details)
  order: Order;
}
