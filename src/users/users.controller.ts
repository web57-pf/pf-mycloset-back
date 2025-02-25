import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticationGuard } from 'src/auth/guards/auth.guard';
import { ApiBody, ApiOperation } from '@nestjs/swagger';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // findAll() {
  //   return this.usersService.findAll()
  // }

  @ApiOperation({
    summary: 'get one user by id'
  })
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
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @ApiOperation({
    summary: 'soft deletes one user'
  })
  @Delete(':id')
  remove(@Param('id') id:string) {
    return this.usersService.remove(id);
  }
}
