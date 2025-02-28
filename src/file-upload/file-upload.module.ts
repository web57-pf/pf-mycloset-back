import { Module } from '@nestjs/common';

import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

import { Clothes } from 'src/clothes/entities/clothes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clothes])],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
