import { Clothes } from "src/clothes/entities/clothes.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'category'
})
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: "varchar"})
    name: string

    @OneToMany(() => Clothes, (clothes) => clothes.category)
    clothes: Clothes[];

    @Column({default: false})
    isDeleted: boolean
}
