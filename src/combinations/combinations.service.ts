import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Combination } from "./combinations.entity";
import { In, Repository } from "typeorm";
import { Clothes } from "src/clothes/entities/clothes.entity";
import { CreateCombinationDto } from "./dto/create-cominations.dto";
import { UpdateCombinationDto } from "./dto/update-combinations.dto";

@Injectable()
export class CombinationsService {
    constructor(
        @InjectRepository(Combination)
        private readonly combinationRepository: Repository<Combination>,
        @InjectRepository(Clothes)
        private readonly clothesRepository: Repository<Clothes>
    ){}
    async create(createCombinationDto: CreateCombinationDto, userid): Promise<Combination>{
        const clothesIdsArray = Array.isArray(createCombinationDto.clothesIds) 
        ? createCombinationDto.clothesIds 
        : JSON.parse(createCombinationDto.clothesIds);

        const clothes = await this.clothesRepository.findBy({id: In(clothesIdsArray)})

        if(clothes.length !== createCombinationDto.clothesIds.length){
            throw new NotFoundException('Some clothes were not found')
        }
        const combination = this.combinationRepository.create({
            name: createCombinationDto.name,
            clothes
        })
        combination.user = userid
        return this.combinationRepository.save(combination)
    }
    async findAll(userId){
        return this.combinationRepository.find({where:{user: {id: userId, isDeleted: false}},
            relations: ['clothes', 'clothes.category', 'clothes.tags']
        })
    }
    
    async findOne(id: string): Promise<Combination> {
        const combination = await this.combinationRepository.findOne({where:{id: id, isDeleted: false}});
        if (!combination) {
            throw new NotFoundException('Combination not found');
        }
        return combination;
    }

    async update(id, updatedCombination: UpdateCombinationDto){
        const getCombination = await this.combinationRepository.findOne({where: {id: id}})
        if(!getCombination) {
            throw new NotFoundException('Combination not found')
        }
        if(updatedCombination.name !== undefined){
            getCombination.name = updatedCombination.name
        }
        if(updatedCombination.clothesIds !== undefined){
            const clothes = await this.clothesRepository.findBy({id: In(updatedCombination.clothesIds)})
            if (clothes.length !== updatedCombination.clothesIds.length){
                throw new NotFoundException('Some clothes were not found')
            }
            getCombination.clothes = clothes
        }
        return await this.combinationRepository.save(getCombination)
    }

    async remove(id){
        const removedCombination = await this.combinationRepository.findOne({where: {id: id}})
        if(!removedCombination) {
            throw new NotFoundException('Combination not found')
        }
        removedCombination.isDeleted = true
        await this.combinationRepository.save(removedCombination)
        return `Combination with id: ${id} has been removed`
    }
}