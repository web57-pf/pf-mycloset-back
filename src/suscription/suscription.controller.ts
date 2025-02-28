import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { SuscriptionService } from './suscription.service';
import { CreateSuscriptionDto } from './dto/create-suscription.dto';
import { UpdateSuscriptionDto } from './dto/update-suscription.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubscriptionType } from './entities/subscriptionType.entity';
import { User } from 'src/users/entities/user.entity';
import { Order } from 'src/order/entities/order.entity';

@Controller('suscription')
@ApiTags('suscription')
export class SuscriptionController {
  constructor(private readonly suscriptionService: SuscriptionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una subscripción' })
  @ApiBody({
    description: 'Crear el cuerpo de la subscripción',
    examples: {
      SubscriptionType: {
        value: {
          //subscriptionType = name the subscriptionType
          SubscriptionType: 'Basic',
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

  @ApiOperation({ summary: 'Devuelve todas las subscripciónes' })
  @Get()
  getAllSubscriptionTypes() {
    return this.suscriptionService.getAllSubscriptionTypes();
  }

  @ApiOperation({ summary: 'Devuelve las subscripciónes por id' })
  @Get(':id')
  getSubscriptionTypeById(@Param('id') id: string) {
    return this.suscriptionService.getSubscriptionTypeById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualización de suscription por id' })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
        price: { type: 'number' },
        duration: { type: 'number' },
        subscriptionType: { type: 'string' },
      },
    },
  })
  async updateSubscriptionType(
    @Param('id') id: string,
    @Body() updateSuscriptionDto: UpdateSuscriptionDto,
  ) {
    const existingSubscription =
      await this.suscriptionService.getSubscriptionTypeById(id);
    if (!existingSubscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
    const subscriptionType: SubscriptionType = {
      id: existingSubscription.id,
      price: updateSuscriptionDto.price,
      SubscriptionType: updateSuscriptionDto.name,
      durationDayTimes: updateSuscriptionDto.durationDayTimes,
      users: existingSubscription.users,
      orderDetails: existingSubscription.orderDetails,
      orders: existingSubscription.orders,
    };

    await this.suscriptionService.updateSubscriptionType(id, subscriptionType);

    return await this.suscriptionService.getSubscriptionTypeById(id);
  }

  @ApiOperation({ summary: 'Eliminación de subscripción por id' })
  @Delete(':id')
  deleteSubscriptionType(@Param('id') id: string) {
    return this.suscriptionService.deleteSubscriptionType(id);
  }
}
