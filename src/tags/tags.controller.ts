import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagsDto } from './dto/create-tags.dto';
import { UpdateTagsDto } from './dto/update-tags.dto';
import { tagsSeeder } from './Seeder/tags.seeder';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/roles.decorator';
import { AuthenticationGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('tags')
export class TagsController {
    constructor(
        private readonly tagsService: TagsService
    ){}

    @ApiOperation({
        summary: 'Seeds pre-loaded clothes'
    })
    @Post('seed')
    async seedTags(){
        return await this.tagsService.seedTags(tagsSeeder)
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
    @Roles(Role.USER, Role.ADMIN)
    @UseGuards(AuthenticationGuard, RolesGuard)
    @Post()
    async create(@Body() createTagsDto: CreateTagsDto) {
        return await this.tagsService.create(createTagsDto)
    }

    @ApiOperation({
        summary: 'Get all tags'
    })
    @Roles(Role.USER, Role.ADMIN)
    @UseGuards(AuthenticationGuard, RolesGuard)
    @Get()
    async findAll(){
        return await this.tagsService.findAll()
    }

    @ApiOperation({
        summary: 'Get one tag by id'
    })
    @Roles(Role.USER, Role.ADMIN)
    @UseGuards(AuthenticationGuard, RolesGuard)
    @Get(':id')
    async findOne(@Param('id') id: string){
        return await this.tagsService.findOne(id)
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
    @Roles(Role.ADMIN, Role.USER)
    @UseGuards(AuthenticationGuard, RolesGuard)
    @Put(':id')
    async update(@Param('id') id: string,
        @Body() updateTagsDto: UpdateTagsDto){
        return await this.tagsService.update(id, updateTagsDto)
    }

    @ApiOperation({
        summary: 'Removes one tag by id'
    })
    @Roles(Role.ADMIN, Role.USER)
    @UseGuards(AuthenticationGuard, RolesGuard)
    @Delete(':id')
    async remove(@Param('id') id: string){
        await this.tagsService.remove(id)
        return `Tag with id: ${id} has been removed`
    }
}
