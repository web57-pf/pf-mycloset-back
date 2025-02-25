import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ){}
  async seedCategories(categorySeeder: string[]) {
    for (const categoryName of categorySeeder){
      const categoryExists = await this.categoryRepository.findOne({where: {name: categoryName}})
      if (!categoryExists) {
        const newCategory = await this.categoryRepository.create({name: categoryName})
        await this.categoryRepository.save(newCategory)
      }
    }
    return 'All categories have been seeded'
  }
  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto)
    return await this.categoryRepository.save(category)
  }

  async findAll() {
    return await this.categoryRepository.find()
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({where: {id: id}})
    if (!category){
      throw new NotFoundException(`Category with id: ${id} not found`)
    }
    return category
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({where: {id: id}})
    Object.assign(category, updateCategoryDto)
    return await this.categoryRepository.save(category)
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOne({where: {id: id}})
    if(!category) {
      throw new NotFoundException(`Category with id ${id} not found`)
    }
    category.isDeleted = true
    return await this.categoryRepository.save(category)
  }
}
