import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { categorySeeder } from './seeder/category.seeder';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthenticationGuard } from 'src/auth/guards/auth.guard';

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
          name: 'Sueters',
        }
      }
    }
  })
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({
    summary: 'Get all categories'
  })
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @ApiOperation({
    summary: 'Get one category by id'
  })
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
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
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  @ApiOperation({
    summary: 'Deletes category by id'
  })
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoryService.remove(id);
  }
}
