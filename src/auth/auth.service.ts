import { BadRequestException, Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { subsType } from 'src/users/enum/suscriptionType';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ){}

  async signupServices(data: Partial<User>) {
    const { email, password } = data;
    
    // Verificar si el correo ya existe
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new BadRequestException('El correo ya está registrado');
    }
    
    // Encriptar la contraseña
    const passwordHas = await hash(password, 10);
    data = { ...data, password: passwordHas };
  
    // Guardar el nuevo usuario
    return this.userRepository.save(data);
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
    // if(!user){
    //   await this.userRepository.save(googleUser)
    // }
    if(user){
        throw new BadRequestException('Usuario ya existente!')
    }

    const newUser = new User()
    newUser.email = googleUser.email 
    newUser.name = googleUser.name
    newUser.isAdmin = false
    newUser.subscriptionType = subsType.free

    await this.userRepository.save(newUser)

    const payload = {newUser}
    const token = this.jwtService.sign(payload)

    return { newUser, token }
  }
}

