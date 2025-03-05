import { Module } from "@nestjs/common";
import { MercadopagoController } from "./mercadopago.controller";
import { MercadopagoService } from "./mercadopago.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/order/entities/order.entity";
import { User } from "mercadopago";
import { OrderService } from "src/order/order.service";
import { UsersService } from "src/users/users.service";
import { OrderModule } from "src/order/order.module";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [OrderModule, UsersModule],
    controllers: [MercadopagoController],
    providers: [MercadopagoService],
    exports: [MercadopagoService]
})

export class MercadopagoModule {}