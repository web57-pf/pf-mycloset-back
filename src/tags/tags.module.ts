import { Module } from "@nestjs/common";
import { Tags } from "./entities/tags.entity";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Tags])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}