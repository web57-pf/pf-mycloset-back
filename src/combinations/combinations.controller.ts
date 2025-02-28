import { Body, Controller, Delete, Get, Post, Put, Param, UseGuards, Req} from "@nestjs/common";
import { CombinationsService } from "./combinations.service";
import { CreateCombinationDto } from "./dto/create-cominations.dto";
import { UpdateCombinationDto } from "./dto/update-combinations.dto";
import { AuthenticationGuard } from "src/auth/guards/auth.guard";
import { ApiBody, ApiOperation } from "@nestjs/swagger";



@Controller('combinations')
export class CombinationsController {
    constructor(
        private readonly combinationsService: CombinationsService
    ){}
    @UseGuards(AuthenticationGuard)
    @Post('create-combination')
    @ApiOperation({
        summary: 'Creates combination for user'
    })
    @ApiBody({
        description: 'Creates combination for user by given clothes ids',
        examples: {
            Combination: {
                value: {
                    name: '',
                    clothesIds: '[{}]'
                }
            }
        }
    })
    async create(@Body() CreateCombinationDto: CreateCombinationDto, @Req() req){
        const userid = req.user.id
        return await this.combinationsService.create(CreateCombinationDto, userid)
    }
    @ApiOperation({
        summary: 'Get all combinations for userId'
    })
    @UseGuards(AuthenticationGuard)
    @Get('user-combinations')
    async findAll(@Req() req) {
        const userid = req.user.id
        return await this.combinationsService.findAll(userid);
    }

    @ApiOperation({
        summary: 'Get one specific combination by combination id'
    })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.combinationsService.findOne(id);
    }

    @ApiOperation({
        summary: 'Updates combination'
    })
    @ApiBody({
        description: 'Updates one specific combination by combination id and body',
        examples: {
            Comination: {
                value: {
                    name: '',
                    clothesIds: '[{}]'
                }
            }
        }
    })
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCombinationDto: UpdateCombinationDto) {
        return await this.combinationsService.update(id, updateCombinationDto);
    }

    @ApiOperation({
        summary: 'Soft deletes one clothe combination by id'
    })
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.combinationsService.remove(id);
    }


}