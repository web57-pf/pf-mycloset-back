import { Module } from '@nestjs/common';
import { CombinationsService } from './combinations.service';
import { CombinationsController } from './combinations.controller';

@Module({
  controllers: [CombinationsController],
  providers: [CombinationsService],
})
export class CombinationsModule {}
