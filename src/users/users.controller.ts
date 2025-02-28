import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticationGuard } from 'src/auth/guards/auth.guard';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @ApiOperation({
    summary: 'Get all users'
  })
  @Get()
  async findAll() {
    return await this.usersService.findAll()
  }

  @ApiOperation({
    summary: 'get one user by id'
  })
  @Roles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({
    summary: 'updates one user'
  })
  @ApiBody({
    description: 'updates one user by id and body',
    examples: {
      User: {
        value: {
          name: '',
          email: '',
          password: '',
        }
      }
    }
  })
  @Roles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
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
