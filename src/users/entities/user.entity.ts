
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Clothes } from "src/clothes/entities/clothes.entity";
import { Combination } from "src/combinations/combinations.entity";
import { Order } from "src/order/entities/order.entity";
import { subsType } from "../enum/suscriptionType";

@Entity({
    name: 'users'
})
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: "varchar", length: 40, nullable: false})
    name: string

    @Column({type: "varchar", length: 50, nullable: false})
    email: string

    @Column({type: "varchar", nullable: true})
    password: string

    @CreateDateColumn()
    registeredAt: Date

    @Column({type: "boolean", default: false})
    isAdmin: boolean

    @Column({default: subsType.free})
    subscriptionType: subsType

    @OneToMany(() => Clothes, (clothes) => clothes.user)
    clothes: Clothes

    @OneToMany(() => Combination, (combination) => combination.user)
    combinations: Combination[];

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

    @Column({default: false})
    isDeleted: boolean
}
