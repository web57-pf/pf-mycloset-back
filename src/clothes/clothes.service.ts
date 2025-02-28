import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClotheDto } from './dto/create-clothe.dto';
import { UpdateClotheDto } from './dto/update-clothe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clothes } from './entities/clothes.entity';
import { In, Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { Tags } from 'src/tags/entities/tags.entity';
import { Combination } from 'src/combinations/combinations.entity';

@Injectable()
export class ClothesService {
  constructor(
    @InjectRepository(Clothes)
    private readonly clothesRepository: Repository<Clothes>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tags)
    private readonly tagsRepository: Repository<Tags>,
    @InjectRepository(Combination)
    private readonly combinationRepository: Repository<Combination>,

  ) {}
  async create(
    createClotheDto: CreateClotheDto,
    userId: string,
  ): Promise<Clothes> {
    const { name, categoryId, type, imageUrl, tags, favorite, combinations } =
      createClotheDto;

    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let clothesTags: Tags[] = [];
    if (tags && Array.isArray(tags)) {
      clothesTags = await this.tagsRepository.findBy({ id: In(tags) });
    }

    let clothesCombinations: Combination[] = [];
    if (combinations && Array.isArray(combinations)) {
      clothesCombinations = await this.combinationRepository.findBy({
        id: In(combinations),
      });
    }

    const clothes = await this.clothesRepository.create({
      name,
      category,
      type,
      imageUrl,
      user: user,
      tags: clothesTags,
      favorite: favorite,
      combinations: clothesCombinations,
    });

    return await this.clothesRepository.save(clothes);

  ){}
  async create(createClotheDto: CreateClotheDto, userId: string): Promise<Clothes> {
    const { name, categoryId, imageUrl, tags, favorite, combinations } = createClotheDto
    
    const category = await this.categoryRepository.findOne({where: {id: categoryId}})
    if (!category) {throw new NotFoundException('Category not found')}

    const user = await this.userRepository.findOne({where: {id: userId}})
    if (!user) {throw new NotFoundException('User not found')}

    let clothesTags: Tags[] = []
    if (tags && Array.isArray(tags)) {
      clothesTags = await this.tagsRepository.findBy({id: In(tags)})
    }

    let clothesCombinations: Combination[] = []
    if (combinations && Array.isArray(combinations)) {
      clothesCombinations = await this.combinationRepository.findBy({id: In(combinations)})
    }

    const clothes = await this.clothesRepository.create({
    name,
    category,
    imageUrl,
    user: user,
    tags: clothesTags,
    favorite: favorite,
    combinations: clothesCombinations
    })

    return await this.clothesRepository.save(clothes)


  }

  async findAll(userId): Promise<Clothes[]> {
    return await this.clothesRepository.find({
      where: {

        user: { id: userId },
      },
    });

        user: {id: userId}
      },
      relations: ['category', 'tags', 'combinations']
    })

  }

  async findOne(id): Promise<Clothes> {
    return await this.clothesRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updatedClothe: UpdateClotheDto) {
    const getClothe = await this.clothesRepository.findOne({ where: { id } });

    if (!getClothe) {
      throw new NotFoundException(`Clothes with id: ${id} not found`);
    }

    Object.assign(getClothe, updatedClothe);
    return await this.clothesRepository.save(getClothe);
  }

  async remove(id: string) {

    const deletedClothe = await this.clothesRepository.delete(id);
    if (deletedClothe.affected === 0) {
      throw new NotFoundException(`Clothe with ID ${id} not found`);

    const clothe = await this.clothesRepository.findOne({where: {id: id}})
    if(!clothe){
      throw new NotFoundException(`Clothe with ID ${id} not found`)

    }
    clothe.isDeleted = true
    
    return `Clothes with id: ${id} removed`;
  }


  async getFilteredClothes(
    categoryId?: string,
    tagIds?: string[],
    favorite?: boolean,
  ) {
    const query = this.clothesRepository
      .createQueryBuilder('clothes')
      .leftJoinAndSelect('clothes.category', 'category')
      .leftJoinAndSelect('clothes.tags', 'tags');

    if (categoryId) {
      query.andWhere('category.id = :categoryId', { categoryId });
    }

    if (tagIds && tagIds.length > 0) {
      query.andWhere('tags.id IN (:...tagIds)', { tagIds });
    }
    if (favorite !== undefined) {
      query.andWhere('clothes.favorite = :favorite', { favorite });
    }

    return query.getMany();

  async getFilteredClothes(categoryId?:string, tagIds?: string[], favorite?: boolean){
    const query = this.clothesRepository.createQueryBuilder('clothes')
    .leftJoinAndSelect('clothes.category', 'category')
    .leftJoinAndSelect('clothes.tags', 'tags')

    if (categoryId){
      query.andWhere('category.id = :categoryId', {categoryId})
    }

    if (tagIds && tagIds.length > 0) {
      query.andWhere('tags.id IN (:...tagIds)', {tagIds})
    } 
    if (favorite !== undefined) {
      query.andWhere('clothes.favorite = :favorite', {favorite})
    }

    return query.getMany()

  }
}
