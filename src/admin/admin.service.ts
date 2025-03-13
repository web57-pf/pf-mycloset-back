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

  async findProUsers(){
    return await this.userRepository.find({
      where: {
        subscriptionType: subsType.pro
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


 // Luci
// Obtiene la cantidad de usuarios registrados por mes (formato YYYY-MM)
  async getMonthlyRegistrations() {
    return await this.userRepository
      .createQueryBuilder("user")
      .select("TO_CHAR(user.registeredAt, 'YYYY-MM')", "month")
      .addSelect("COUNT(user.id)", "count")
      .groupBy("month")
      .orderBy("month", "ASC")
      .getRawMany();
  }

// Obtiene la variación mensual de suscripciones por tipo
  async getMonthlySubscriptionVariation() {
    return await this.userRepository
      .createQueryBuilder("user")
      .select("TO_CHAR(user.registeredAt, 'YYYY-MM')", "month")
      .addSelect("user.subscriptionType", "subscriptionType")
      .addSelect("COUNT(user.id)", "count")
      .groupBy("month")
      .addGroupBy("user.subscriptionType")
      .orderBy("month", "ASC")
      .getRawMany();
  }

  /**
 * Seeder: Crea 100 usuarios ficticios con fechas de registro y tipos de suscripción aleatorios.
 */
  async seedUsers(): Promise<{ message: string }> {
    const subscriptionTypes = [subsType.free, subsType.premium, subsType.pro];
    const currentYear = new Date().getFullYear();
    const startDate = new Date(`${currentYear}-01-01`);
    const endDate = new Date(`${currentYear}-12-31`);

    // Función auxiliar para generar una fecha aleatoria entre dos fechas
    const randomDate = (start: Date, end: Date): Date => {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    const usersToCreate = 100;
    for (let i = 0; i < usersToCreate; i++) {
      const user = this.userRepository.create({
        name: `User${i}`,
        email: `user${i}@example.com`,
        password: 'password', // En producción deberías encriptarla
        registeredAt: randomDate(startDate, endDate), // Asignar una fecha aleatoria para el registro
        isAdmin: false,
        subscriptionType: subscriptionTypes[Math.floor(Math.random() * subscriptionTypes.length)],
        isDeleted: false,
      });
      await this.userRepository.save(user);
    }
    return { message: '100 usuarios ficticios creados exitosamente.' };
  }
}


