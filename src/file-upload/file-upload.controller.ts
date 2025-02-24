import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
<<<<<<< HEAD
import { FileUploadService } from './file-upload.service';
=======
import { ClothesUploadService } from './clothes-upload.service';
>>>>>>> 4073d2be605ae305bd6d9a826a237861fc7d28e3

@ApiTags('file-upload')
@Controller('file-upload')
export class FileUploadController {
<<<<<<< HEAD
  constructor(private readonly FileUploadService: FileUploadService) {}
=======
  constructor(private readonly clothesUploadService: ClothesUploadService) {}
>>>>>>> 4073d2be605ae305bd6d9a826a237861fc7d28e3

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
<<<<<<< HEAD
    return this.FileUploadService.uploadImage(file);
=======
    return this.clothesUploadService.uploadImage(file);
>>>>>>> 4073d2be605ae305bd6d9a826a237861fc7d28e3
  }

  @Post('upload/:clotheid')
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'clotheid', required: true })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadClotheImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('clotheid') clotheid: string,
  ) {
<<<<<<< HEAD
    return this.FileUploadService.uploadClotheImage(file, clotheid);
=======
    return this.clothesUploadService.uploadClotheImage(file, clotheid);
>>>>>>> 4073d2be605ae305bd6d9a826a237861fc7d28e3
  }
}
