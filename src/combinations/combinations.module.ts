import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Combination } from './combinations.entity';
import { Clothes } from 'src/clothes/entities/clothes.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CombinationsController } from './combinations.controller';
import { CombinationsService } from './combinations.service';

@Module({
    imports: [TypeOrmModule.forFeature([Combination, Clothes]), AuthModule],
    controllers: [CombinationsController],
    providers: [CombinationsService]
})
export class CombinationsModule {}
