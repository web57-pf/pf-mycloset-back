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
import { SubscriptionType } from './entities/subscriptionType.entity';
import { User } from 'src/users/entities/user.entity';

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
          name: 'Basic',
          price: 10,
          duration: 30,
        },
      },
    },
  })
  async createSubscriptionType(
    @Body() createSuscriptionDto: CreateSuscriptionDto,
  ) {
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
      SubscriptionType: { value: { name: 'Premium', price: 20, duration: 60 } },
    },
  })
  @Put(':id')
  updateSubscriptionType(
    @Param('id') id: string,
    @Body() updateSuscriptionDto: UpdateSuscriptionDto,
  ) {
    const subscriptionType: SubscriptionType = {
      id: updateSuscriptionDto.id,
      price: updateSuscriptionDto.price,
      durationDayTimes: updateSuscriptionDto.duration,
      SubscriptionType: updateSuscriptionDto.category,
      users: [], // Add an empty array or appropriate user data here
    };
    return this.suscriptionService.updateSubscriptionType(id, subscriptionType);
  }

  @ApiOperation({ summary: 'Delete subscription type by id' })
  @Delete(':id')
  deleteSubscriptionType(@Param('id') id: string) {
    return this.suscriptionService.deleteSubscriptionType(id);
  }
}
