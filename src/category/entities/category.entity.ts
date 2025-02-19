import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'category'
})
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: "varchar"})
    name: string

}
