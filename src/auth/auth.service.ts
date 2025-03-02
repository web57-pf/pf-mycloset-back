import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ){}

  async signupServices(data: Partial<User>){
    const { password } = data
    const passwordHas = await hash(password, 10)
    data = {...data, password: passwordHas}
    return this.userRepository.save(data)
  }

  async signinServices(data: Partial<User>){
    const user = await this.userRepository.findOneBy({email: data.email})
    if(!user) throw new UnauthorizedException('Credenciales invalidas!')
    const checkPassword = await compare(data.password, user.password)
    if(!checkPassword) throw new UnauthorizedException('Crendenciales invalidas!')
     
    const { password, ...userWhitOutPassword} = user  

    const payload = { id: user.id, email: user.email, isAdmin: user.isAdmin, subscription: user.subscriptionType };
    
    const token = this.jwtService.sign(payload);

    return { token, userWhitOutPassword };
  }

  async valideteGoogleUser(googleUser: any){
    let user = await this.userRepository.findOneBy({email: googleUser.email})
    if(!user){
      await this.userRepository.save(googleUser)
    }

    const payload = {user}
    const token = this.jwtService.sign(payload)

    return { user, token }
  }
}

