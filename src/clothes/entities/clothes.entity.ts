import { Category } from "src/category/entities/category.entity";
import { Combination } from "src/combinations/combinations.entity";
import { Tags } from "src/tags/entities/tags.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'clothes'
})
export class Clothes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.clothes)
  category: Category;

  @Column()
  imageUrl: string

  @ManyToOne(() => User, (user) => user.clothes)
  user: User;

  @ManyToMany(() => Tags, (tags) => tags.clothes)
  @JoinTable({name: 'clothes_tags'})
  tags: Tags[]

  @Column({default: false})
  favorite: boolean

  @ManyToMany(()=> Combination, (combination)=> combination.clothes)
  combinations: Combination[]

  @Column({default: false})
  isDeleted: boolean
}
