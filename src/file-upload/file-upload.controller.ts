import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { FileUploadService } from './file-upload.service';

@ApiTags('fileUpload')
@Controller('fileUpload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

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
    console.log(file);

    return this.fileUploadService.uploadImage(file);
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
    return this.fileUploadService.uploadClotheImage(file, clotheid);
  }
}
