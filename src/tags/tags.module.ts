import { Module } from "@nestjs/common";
import { Tags } from "./entities/tags.entity";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Tags]), AuthModule],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}