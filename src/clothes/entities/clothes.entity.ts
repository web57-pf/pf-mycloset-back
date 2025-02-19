import { Category } from "src/category/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'clothes'
})
export class Clothes {
    @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.name)
  category: Category;

  @Column()
  type: string

  @Column()
  imageUrl: string

  @ManyToOne(() => User, (user) => user.clothes)
  user: User;

  @Column()
  tags: string

  @Column()
  favorite: Boolean
}
