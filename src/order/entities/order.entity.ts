import { OrderDetail } from "src/order_detail/entities/order_detail.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'order'
})
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> User, (user) => user.orders)
    user: User

    @OneToMany(()=> OrderDetail, (details) => details.order)
    details: OrderDetail[]
}
