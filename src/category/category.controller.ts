import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { categorySeeder } from './seeder/category.seeder';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: 'Seeds pre-loaded categories'
  })
  @Post('seed')
  async seedCategories(){
    return await this.categoryService.seedCategories(categorySeeder)
  }

  @ApiOperation({
    summary: 'Creates category'
  })
  @ApiBody({
    description: 'Creates clothe category type by body',
    examples: {
      Category: {
        value: {
          name: '',
        }
      }
    }
  })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({
    summary: 'Get all categories'
  })
  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @ApiOperation({
    summary: 'Get one category by id'
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(id);
  }

  @ApiOperation({
    summary: 'Updates category'
  })
  @ApiBody({
    description: 'Updates one category by id and body',
    examples: {
      Category: {
        value: {
          name: '',
        }
      }
    }
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  @ApiOperation({
    summary: 'Deletes category by id'
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoryService.remove(id);
  }
}
