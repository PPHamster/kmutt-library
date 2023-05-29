import { Folder, ImageService } from '@/services/ImageService';
import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('images')
export class ImageController {
  public constructor(private readonly imageService: ImageService) {}

  @Get(':folder/:file')
  public async getImagePath(
    @Param('folder') folder: Folder,
    @Param('file') file: string,
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .sendFile(this.imageService.getImagePath(folder, file));
  }
}
