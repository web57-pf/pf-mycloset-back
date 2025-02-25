import { Clothes } from "src/clothes/entities/clothes.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'tags'
})

export class Tags {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({unique: true})
    name: string

    @ManyToMany(()=> Clothes, (clothes) => clothes.tags)
    clothes: Clothes[]

    @Column({default: false})
    isDeleted: boolean
}