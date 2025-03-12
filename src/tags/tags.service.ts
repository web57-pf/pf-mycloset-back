import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Tags } from "./entities/tags.entity";
import { CreateTagsDto } from "./dto/create-tags.dto";
import { UpdateTagsDto } from "./dto/update-tags.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tags)
        private readonly tagsRepository: Repository<Tags>
    ){}
    async seedTags(tagsSeeder){
        for (const tagName of tagsSeeder){
            const tagExists = await this.tagsRepository.findOne({where: {name: tagName}})
            if (!tagExists) {
                const newTag = await this.tagsRepository.create({name: tagName})
                await this.tagsRepository.save(newTag)
            }
        }
        return 'All tags have been seeded'
    }
    async create(createTagsDto: CreateTagsDto) {
        return await this.tagsRepository.save(createTagsDto) 
    }
    async findAll() {
        return await this.tagsRepository.find({where: {isDeleted: false}})
    }
    async findOne(id) {
        return await this.tagsRepository.findOne({where: {id: id, isDeleted: false}})
    }
    async update(id, updateTagsDto: UpdateTagsDto) {
        const updatedTags = await this.tagsRepository.findOne({where: {id: id}})
        if (!updatedTags) {
            throw new NotFoundException(`Tag with id ${id} not found`)
        }
        Object.assign(updatedTags, updateTagsDto)
        return await this.tagsRepository.save(updatedTags)
    }
    async remove(id: string) {
        const tag = await this.tagsRepository.findOne({where: {id: id}})
        if(!tag) {
            throw new NotFoundException(`Tag with id ${id} not found`)
          }
        tag.isDeleted = true
        await this.tagsRepository.save(tag)
        return `Tag with id: ${id} has been removed`
    }
}