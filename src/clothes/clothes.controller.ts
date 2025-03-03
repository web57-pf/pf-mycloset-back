import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus, UseGuards, Req, Query } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { CreateClotheDto } from './dto/create-clothe.dto';
import { UpdateClotheDto } from './dto/update-clothe.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/guards/auth.guard';

@Controller('clothes')
@ApiTags('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  @UseGuards(AuthenticationGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({
    summary: 'Create clothes'
  })
  @ApiBody({
    description: 'Creates clothe for user by body',
    examples: {
      Clothe: {
        value: {
          name: '',
          categoryId: '',
          imageUrl: '',
          tags: '',
          favorite: '',
          combinations: ''
        }
      }
    }
  })
  async create(@Body() createClotheDto: CreateClotheDto, @Req() req) {
    const userid = req.user.id
    return await this.clothesService.create(createClotheDto, userid);
  }

  @UseGuards(AuthenticationGuard)
  @ApiOperation({
    summary: 'Get all user clothes'
  })
  @Get()
  async findAll(@Req() req) {
    const userId = req.user.id
    return await this.clothesService.findAll(userId);
  }

  @UseGuards(AuthenticationGuard)
  @ApiOperation({
    summary: 'Get user clothe by id'
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clothesService.findOne(id);
  }

  @UseGuards(AuthenticationGuard)
  @ApiOperation({
    summary: 'Update user clothe by id and body'
  })
  @ApiBody({
    description: 'Update clothe for user by body and id',
    examples: {
      Clothe: {
        value: {
          name: '',
          categoryId: '',
          imageUrl: '',
          tags: '',
          favorite: '',
          combinations: ''
        }
      }
    }
  })
  @Put(':id')
  async updateClothe(@Param('id') id: string,
  @Body() updateClotheDto: UpdateClotheDto) {
    const updatedClothe = await this.clothesService.update(id, updateClotheDto);
     return `Clothe with id: ${updatedClothe.id} has been updated`
  }

  @ApiOperation({
    summary: 'Delete clothe by clothe id'
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.clothesService.remove(id)
    return `Clothe with id: ${id} has been removed`;
  }

  @Get('filter/get')
  async filterClothes(
    @Query('category') categoryId?: string,
    @Query('tags') tags?: string,
    @Query('favorite') favorite?: boolean
  ){
    console.log(categoryId)
    console.log(tags)
    const tagIds = tags ? tags.split(',') : undefined
    const isFavorite = favorite !== undefined ? favorite === true : undefined

    return await this.clothesService.getFilteredClothes(categoryId, tagIds, isFavorite)
  }
}
