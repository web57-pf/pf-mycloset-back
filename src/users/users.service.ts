import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}
  // findAll() {
  //   return `This action returns all users`;
  // }

  async findOne(id: string) {
    const foundUser = await this.userRepository.findOne({where: {id: id}})
    return `User with id: ${id} is ${foundUser} (not formatted) `;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const foundUser = await this.userRepository.findOne({where: {id: id}})
    Object.assign(foundUser, updateUserDto)
    await this.userRepository.save(foundUser)
    return `User with id: ${id} has been updated`;
  }

  async remove(id: string) {
    const foundUser = await this.userRepository.findOne({where: {id: id}})
    foundUser.isDeleted = true
    await this.userRepository.save(foundUser)
    return `User with id: ${id} has been removed`
  }
}
