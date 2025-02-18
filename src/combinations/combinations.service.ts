import { Injectable } from '@nestjs/common';
import { CreateCombinationDto } from './dto/create-combination.dto';
import { UpdateCombinationDto } from './dto/update-combination.dto';

@Injectable()
export class CombinationsService {
  create(createCombinationDto: CreateCombinationDto) {
    return 'This action adds a new combination';
  }

  findAll() {
    return `This action returns all combinations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} combination`;
  }

  update(id: number, updateCombinationDto: UpdateCombinationDto) {
    return `This action updates a #${id} combination`;
  }

  remove(id: number) {
    return `This action removes a #${id} combination`;
  }
}
