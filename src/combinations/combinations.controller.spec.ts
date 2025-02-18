import { Test, TestingModule } from '@nestjs/testing';
import { CombinationsController } from './combinations.controller';
import { CombinationsService } from './combinations.service';

describe('CombinationsController', () => {
  let controller: CombinationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombinationsController],
      providers: [CombinationsService],
    }).compile();

    controller = module.get<CombinationsController>(CombinationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
