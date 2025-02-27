import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ClothesUploadService } from './file-upload.service';

@ApiTags('file-upload')
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly clothesUploadService: ClothesUploadService) {}

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
    return this.clothesUploadService.uploadImage(file);
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
    return this.clothesUploadService.uploadClotheImage(file, clotheid);
  }
}
