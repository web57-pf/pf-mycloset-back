import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagsDto } from './dto/create-tags.dto';
import { UpdateTagsDto } from './dto/update-tags.dto';
import { tagsSeeder } from './Seeder/tags.seeder';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('tags')
export class TagsController {
    constructor(
        private readonly tagsService: TagsService
    ){}

    @ApiOperation({
        summary: 'Seeds pre-loaded clothes'
    })
    @Post('seed')
    seedTags(){
        return this.tagsService.seedTags(tagsSeeder)
    }

    @ApiOperation({
        summary: 'Creates tags'
    })
    @ApiBody({
        description: 'Creates tags by body',
        examples: {
            Tags: {
                value: {
                    name: ''
                }
            }
        }
    })
    @Post()
    create(@Body() createTagsDto: CreateTagsDto) {
        return this.tagsService.create(createTagsDto)
    }

    @ApiOperation({
        summary: 'Get all tags'
    })
    @Get()
    findAll(){
        return this.tagsService.findAll()
    }

    @ApiOperation({
        summary: 'Get one tag by id'
    })
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.tagsService.findOne(id)
    }

    @ApiOperation({
        summary: 'Update one tag'
    })
    @ApiBody({
        description: 'Updates one tag by id and body',
        examples: {
            Tags: {
                value: {
                    name: ''
                }
            }
        }
    })
    @Put(':id')
    update(@Param('id') id: string,
        @Body() updateTagsDto: UpdateTagsDto){
        return this.tagsService.update(id, updateTagsDto)
    }

    @ApiOperation({
        summary: 'Removes one tag by id'
    })
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.tagsService.remove(id)
    }
}
