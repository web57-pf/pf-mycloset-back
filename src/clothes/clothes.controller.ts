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
          type: '',
          imageUrl: '',
          tags: '',
          favorite: '',
          combinations: ''
        }
      }
    }
  })
  create(@Body() createClotheDto: CreateClotheDto, @Req() req) {
    const userid = req.user.id
    return this.clothesService.create(createClotheDto, userid);
  }

  @UseGuards(AuthenticationGuard)
  @ApiOperation({
    summary: 'Get all user clothes'
  })
  @Get()
  findAll(@Req() req) {
    const userId = req.user.id
    return this.clothesService.findAll(userId);
  }

  @ApiOperation({
    summary: 'Get user clothe by id'
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clothesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update user clothe by and body'
  })
  @ApiBody({
    description: 'Update clothe for user by body',
    examples: {
      Clothe: {
        value: {
          name: '',
          categoryId: '',
          type: '',
          imageUrl: '',
          tags: '',
          favorite: '',
          combinations: ''
        }
      }
    }
  })
  @Put(':id')
  updateClothe(@Param('id') id: string,
  @Body() updateClotheDto: UpdateClotheDto) {
    const updatedClothe = this.clothesService.update(id, updateClotheDto);
     return `Clothe with id: ${updatedClothe} has been updated`
  }

  @ApiOperation({
    summary: 'Delete clothe by clothe id'
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.clothesService.remove(id)
    return `Clothe with id: ${id}`;
  }

  @Get('filter/get')
  filterClothes(
    @Query('category') categoryId?: string,
    @Query('tags') tags?: string,
    @Query('favorite') favorite?: string
  ){
    console.log(categoryId)
    console.log(tags)
    const tagIds = tags ? tags.split(',') : undefined
    const isFavorite = favorite !== undefined ? favorite === 'true' : undefined

    return this.clothesService.getFilteredClothes(categoryId, tagIds, isFavorite)
  }
}
