import { Body, Controller, Delete, Get, Post, Put, Param} from "@nestjs/common";
import { CombinationsService } from "./combinations.service";
import { CreateCombinationDto } from "./dto/create-cominations.dto";
import { UpdateCombinationDto } from "./dto/update-combinations.dto";



@Controller('combinations')
export class CombinationsController {
    constructor(
        private readonly combinationsService: CombinationsService
    ){}
    @Post()
    create(@Body() CreateCombinationDto: CreateCombinationDto){
        return this.combinationsService.create(CreateCombinationDto)
    }

    @Get(':userid')
    findAll(@Param('userId') userId: string) {
    return this.combinationsService.findAll(userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
    return this.combinationsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCombinationDto: UpdateCombinationDto) {
    return this.combinationsService.update(id, updateCombinationDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
    return this.combinationsService.remove(id);
     }


}