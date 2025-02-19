import { Clothes } from "src/clothes/entities/clothes.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Combination {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.combinations)
  user: User;

  @ManyToMany(() => Clothes)
  @JoinTable()
  clothes: Clothes[];
}