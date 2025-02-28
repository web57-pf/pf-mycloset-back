import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadApiResponse } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { Clothes } from 'src/clothes/entities/clothes.entity';
import toStream from 'buffer-to-stream';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(Clothes)
    private readonly clothesRepository: Repository<Clothes>,
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            reject(new Error(error.message));
          } else {
            if (result) {
              resolve(result);
            } else {
              reject(new Error('Upload result is undefined'));
            }
          }
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadClotheImage(file: Express.Multer.File, clotheid: string) {
    const clothes = await this.clothesRepository.findOneBy({ id: clotheid });

    if (!clothes) {
      throw new NotFoundException('Clothes not found');
    }

    const uploadedImage = await this.uploadImage(file);

    await this.clothesRepository.update(clothes.id, {
      imageUrl: uploadedImage.secure_url,
    });

    const updatedClothe = await this.clothesRepository.findOneBy({
      id: clotheid,
    });

    return updatedClothe;
  }
}
