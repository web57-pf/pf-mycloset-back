import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SubscriptionType } from './entities/subscriptionType.entity';

@Injectable()
export class SuscriptionService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(SubscriptionType)
    private subscriptionRepository: Repository<SubscriptionType>,
  ) {}

  async suscribeUser(userId: string, suscribedId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const suscribed = await this.userRepository.findOne({
      where: { id: suscribedId },
    });

    user.subscriptionType = suscribed.subscriptionType;
    await this.userRepository.save(user);
  }

  async createSubscriptionType(subscriptionType: SubscriptionType) {
    return await this.subscriptionRepository.save(subscriptionType);
  }

  async getAllSubscriptionTypes() {
    return await this.subscriptionRepository.find();
  }

  async getSubscriptionTypeById(id: string) {
    return await this.subscriptionRepository.findOne({ where: { id } });
  }

  async updateSubscriptionType(id: string, subscriptionType: SubscriptionType) {
    return await this.subscriptionRepository.update(id, subscriptionType);
  }

  async deleteSubscriptionType(id: string) {
    return await this.subscriptionRepository.delete(id);
  }
}
