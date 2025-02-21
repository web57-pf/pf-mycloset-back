import { Module } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clothes } from './entities/clothes.entity';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { Tags } from 'src/tags/entities/tags.entity';
import { Combination } from 'src/combinations/combinations.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Clothes, Category, User, Tags, Combination]), 
  AuthModule],
  controllers: [ClothesController],
  providers: [ClothesService],
})
export class ClothesModule {}
