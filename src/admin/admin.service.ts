import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { subsType } from 'src/users/enum/suscriptionType';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
      ){}

    async findAll() {
        return this.userRepository.find({
          relations: {
            clothes: true,
            combinations: true
          }
     })
    }

    async findById(id: string) {
      return this.userRepository.find({
        where: {id},
        relations: {
          clothes: true,
          combinations: true
        }
     })
  }

  async updateUser(id: string, data: Partial<User>) {
    const user = await this.userRepository.findOneBy({id: id})
    if (!user) throw new NotFoundException('Usuario no encontrado');
    await this.userRepository.update(user.id, { ...data })
    return this.userRepository.findOneBy({ id: user.id });
  }

  async deleteUser(id: string) {
    const foundUser = await this.userRepository.findOne({where: {id: id}})
    if (!foundUser) {
      throw new NotFoundException('User not found')
    }
    foundUser.isDeleted = true
    await this.userRepository.save(foundUser)
    return `User with id: ${id} has been removed`
  }

  async findFreeUsers(){
    return await this.userRepository.find({
      where: {
        subscriptionType: subsType.free
      }
    })
  }

  async findPremiumUsers(){
    return await this.userRepository.find({
      where: {
        subscriptionType: subsType.premium
      }
    })
  }

 async usersBanned(){
    return await this.userRepository.find({
      where:{
        isDeleted: true
      }
    })
 }

}
