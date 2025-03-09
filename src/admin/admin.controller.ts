import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiOperation } from '@nestjs/swagger';
import { hash } from 'bcrypt';
import { Role } from 'src/auth/roles.enum';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AuthenticationGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { subsType } from 'src/users/enum/suscriptionType';
import { OrderDetail } from 'src/order_detail/entities/order_detail.entity';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(OrderDetail) private readonly orderDetailRepository: Repository<OrderDetail>
  ) {}

   // Crear un usuario admin por default 
    @ApiOperation({
      summary: 'Crear un usuario admin por default -> email: admin@gmail.com, password: admin'
    })
    @Post()
    async createAdmin(){
      const user = new User()
      user.name = 'admin'
      user.email = 'admin@gmail.com'
      const passworHas = await hash('admin',10)
      user.password = passworHas
      user.isAdmin = true
      return await this.userRepository.save(user)
    }

    // Todos los usuarios
    @Roles(Role.ADMIN)
    @UseGuards(AuthenticationGuard, RolesGuard)
    @ApiOperation({
        summary: 'Obtener todos los usuarios'
    })
    @Get()
    async findAll() {
        return await this.adminService.findAll()
    }

    // Un usuario por id
    @Roles(Role.ADMIN)
    @UseGuards(AuthenticationGuard, RolesGuard)
    @ApiOperation({
      summary: 'Obtener un usuario por id'
    })
    @Get(':id')
    async findById(@Param('id') id: string) {
        return await this.adminService.findById(id)
    }

    // Actualizar un usuario
    @Roles(Role.ADMIN)
    @UseGuards(AuthenticationGuard, RolesGuard)
    @ApiOperation({
      summary: 'Actualizar un usuario'
    })
    @Put(':id')
    async updateUser(@Body() data: any, @Param('id') id: string) {
      return await this.adminService.updateUser(id, data)
    }

    // Eliminar un usuario
    @Roles(Role.ADMIN)
    @UseGuards(AuthenticationGuard, RolesGuard)
    @ApiOperation({
      summary: 'Eliminar un usuario'
    })
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
      return await this.adminService.deleteUser(id)
    }

    @ApiOperation({ summary: 'Obtener usuarios con suscripción free' })
    @Roles(Role.ADMIN)
    @UseGuards(AuthenticationGuard, RolesGuard)
    @Get('subscription/free')
    async getFreeUsers(): Promise<User[]> {
      return this.adminService.findFreeUsers();
    }

    @ApiOperation({ summary: 'Obtener usuarios con suscripción premium' })
    @Roles(Role.ADMIN)
    @UseGuards(AuthenticationGuard, RolesGuard)
    @Get('subscription/premium')
    async getPremiumUsers(): Promise<User[]> {
      return this.adminService.findPremiumUsers();
    }

    @Get('banned/users')
    @Roles(Role.ADMIN)
    @UseGuards(AuthenticationGuard, RolesGuard)
    @ApiOperation({ summary: 'Obtener usuarios baneados' })
    async getBannedUsers(){
       return await this.adminService.usersBanned()
    }

    @ApiOperation({ summary: 'Total de ventas' })
    @Get('total/sales')
    @Roles(Role.ADMIN)
    @UseGuards(AuthenticationGuard, RolesGuard)
    async totalSales() {
      const result = await this.orderDetailRepository
        .createQueryBuilder('orderDetail')
        .select('SUM(orderDetail.price)', 'total')
        .getRawOne();
    
      // Si no hay resultados, devolver 0 en lugar de null
      const total = result?.total ?? 0; // Si result.total es null o undefined, devolver 0
    
      return { total };
    }

}
