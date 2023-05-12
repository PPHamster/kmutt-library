import { ImageService } from '@/services/ImageService';
import { ImageController } from '@/controllers/ImageController';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
