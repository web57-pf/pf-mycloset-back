import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticationGuard } from 'src/auth/guards/auth.guard';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}


  @Roles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @ApiOperation({
    summary: 'Obtener todos los usuarios'
  })
  @Get()
  async findAll() {
    return await this.usersService.findAll()
  }

  
  @ApiOperation({
    summary: 'Obtener datos de un usuario por id'
  })
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }


  @ApiOperation({
    summary: 'Actualizar un usuario por id'
  })
  @ApiBody({
    description: 'Datos del usuario a actualizar',
    examples: {
      User: {
        value: {
          name: 'Example',
          email: 'Example@gmail.com',
          password: 'asdsadqwe123',
        }
      }
    }
  })
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }
  

  @Post('password')
  async updatePassword(@Body() data: { email: string; password: string }) {
  const user = await this.userRepository.findOneBy({ email: data.email });

  if (!user) {
    throw new NotFoundException('Email inválido');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10); // Encriptar la contraseña
  await this.userRepository.update(user.id, { password: hashedPassword }); // Asegúrate de usar el 'id' o clave primaria

  return { msg: 'Contraseña actualizada correctamente' };
  }


  @ApiOperation({
    summary: 'soft deletes one user'
  })
  @Roles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id:string) {
    return this.usersService.remove(id);
  }



}
