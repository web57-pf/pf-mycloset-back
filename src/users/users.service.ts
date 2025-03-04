import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}
  async findAll() {
    return this.userRepository.find()
  }

  async findOne(id: string) {
    const foundUser = await this.userRepository.findOne({where: {id: id}})
    if(!foundUser){
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return foundUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const foundUser = await this.userRepository.findOne({where: {id: id}})
    if(updateUserDto.password){
      if(!updateUserDto.currentPassword){
        throw new UnauthorizedException('Debe proporcionar la contraseña actual para cambiarla')
      }
      const passwordMatches = await bcrypt.compare(updateUserDto.currentPassword, foundUser.password)
      if(!passwordMatches){
        throw new UnauthorizedException('La contraseña actual es incorrecta')
      }
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(updateUserDto.password, saltRounds)
      updateUserDto = {...updateUserDto, password: hashedPassword}
    } else {
      updateUserDto = {...updateUserDto, password: undefined, currentPassword: undefined}
    }
    Object.assign(foundUser, updateUserDto)
    return await this.userRepository.save(foundUser)
  }

  async remove(id: string) {
    const foundUser = await this.userRepository.findOne({where: {id: id}})
    if (!foundUser) {
      throw new NotFoundException('User not found')
    }
    foundUser.isDeleted = true
    await this.userRepository.save(foundUser)
    return `User with id: ${id} has been removed`
  }
  async usersByEmail(email: string){
    return await this.userRepository.findOneBy({email: email})
  }
  async updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
