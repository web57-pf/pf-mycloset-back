import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagsDto } from './dto/create-tags.dto';
import { UpdateTagsDto } from './dto/update-tags.dto';
import { tagsSeeder } from './Seeder/tags.seeder';

@Controller('tags')
export class TagsController {
    constructor(
        private readonly tagsService: TagsService
    ){}

    @Post('seed')
    seedTags(){
        return this.tagsService.seedTags(tagsSeeder)
    }
    @Post()
    create(@Body() createTagsDto: CreateTagsDto) {
        return this.tagsService.create(createTagsDto)
    }

    @Get()
    findAll(){
        return this.tagsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.tagsService.findOne(id)
    }

    @Put(':id')
    update(@Param('id') id: string,
        @Body() updateTagsDto: UpdateTagsDto){
        return this.tagsService.update(id, updateTagsDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.tagsService.remove(id)
    }
}
