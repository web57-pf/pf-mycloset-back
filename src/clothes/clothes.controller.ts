import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { CreateClotheDto } from './dto/create-clothe.dto';
import { UpdateClotheDto } from './dto/update-clothe.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('clothes')
@ApiTags('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

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
          

        }
      }
    }
  })
  create(@Body() createClotheDto: CreateClotheDto) {
    return this.clothesService.create(createClotheDto);
  }

  @ApiOperation({
    summary: 'Get all user clothes'
  })
  @Get(':id')
  findAll(@Param('userId') userId: string) {
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.clothesService.remove(id)
    return `Clothe with id: ${id}`;
  }
}
