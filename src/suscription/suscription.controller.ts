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
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
@Controller('suscription')
@ApiTags('suscription')
export class SuscriptionController {
  constructor(private readonly suscriptionService: SuscriptionService) {}

  @Post()
  @ApiOperation({ summary: 'Create subscription type' })
  @ApiBody({
    description: 'Creates subscription type by body',
    examples: {
      SubscriptionType: {
        value: {
          name: '',
          price: 0,
          duration: 0,
        },
      },
    },
  })
  createSubscriptionType(@Body() createSuscriptionDto: CreateSuscriptionDto) {
    return this.suscriptionService.createSubscriptionType(createSuscriptionDto);
  }

  @ApiOperation({ summary: 'Get all subscription types' })
  @Get()
  getAllSubscriptionTypes() {
    return this.suscriptionService.getAllSubscriptionTypes();
  }
  @ApiOperation({ summary: 'Get subscription type by id' })
  @Get(':id')
  getSubscriptionTypeById(@Param('id') id: string) {
    return this.suscriptionService.getSubscriptionTypeById(id);
  }
  @ApiOperation({ summary: 'Update subscription type by id and body' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        price: { type: 'number' },
        duration: { type: 'number' },
      },
    },
    examples: {
      SubscriptionType: { value: { name: '', price: 0, duration: 0 } },
    },
  })
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
  @ApiOperation({ summary: 'Delete subscription type by id' })
  @Delete(':id')
  deleteSubscriptionType(@Param('id') id: string) {
    return this.suscriptionService.deleteSubscriptionType(id);
  }
}
