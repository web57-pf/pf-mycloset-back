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
    if(!user){
      await this.userRepository.save(googleUser)
    }
    const payload = {user}
    const token = this.jwtService.sign(payload)

    return { user, token }
  }

  // async valideteGoogleUser(googleUser: any) {
  //   let user = await this.userRepository.findOneBy({ email: googleUser.email });
  
  //   if (!user) {
  //     // Si el usuario no existe, creamos uno nuevo con valores predeterminados
  //     user = new User();
  //     user.email = googleUser.email;
  //     user.name = googleUser.name || 'Usuario de Google';
  //     user.isAdmin = false;
  //     user.subscriptionType = subsType.free; // Valor predeterminado de suscripción
  //   } else {
  //     // Si el usuario ya existe, actualizamos su suscripción si es necesario
  //     if (googleUser.subscriptionType && googleUser.subscriptionType !== user.subscriptionType) {
  //       user.subscriptionType = googleUser.subscriptionType; // Actualizamos el tipo de suscripción
  //     }
  //   }

  //   await this.userRepository.save(user);
  
  //   // Generamos el token
  //   const payload = {
  //     id: user.id,
  //     email: user.email,
  //     subscriptionType: user.subscriptionType,
  //     roles: user.isAdmin,
  //   };
  
  //   const token = this.jwtService.sign(payload);
  
  //   return { user, token };
  // }
  
}

