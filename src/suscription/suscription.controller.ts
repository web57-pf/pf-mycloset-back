import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SuscriptionService } from './suscription.service';
import { CreateSuscriptionDto } from './dto/create-suscription.dto';
import { UpdateSuscriptionDto } from './dto/update-suscription.dto';

@Controller('suscription')
export class SuscriptionController {
  constructor(private readonly suscriptionService: SuscriptionService) {}

  @Post()
  createSubscriptionType(@Body() createSuscriptionDto: CreateSuscriptionDto) {
    return this.suscriptionService.createSubscriptionType(createSuscriptionDto);
  }

  @Get()
  getAllSubscriptionTypes() {
    return this.suscriptionService.getAllSubscriptionTypes();
  }

  @Get(':id')
  getSubscriptionTypeById(@Param('id') id: string) {
    return this.suscriptionService.getSubscriptionTypeById(id);
  }

  @Put(':id')
  updateSubscriptionType(
    @Param('id') id: string,
    @Body() updateSuscriptionDto: any,
  ) {
    return this.suscriptionService.updateSubscriptionType(
      id,
      updateSuscriptionDto,
    );
  }

  @Delete(':id')
  deleteSubscriptionType(@Param('id') id: string) {
    return this.suscriptionService.deleteSubscriptionType(id);
  }
}
