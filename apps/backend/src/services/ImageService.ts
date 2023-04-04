import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import * as path from 'path';

@Injectable()
export class ImageService {
  public readonly folderPath = path.join(__dirname, '../../images');

  public async saveImageFromBase64(
    base64: string,
    fileName: string,
  ): Promise<string> {
    const fullPath = path.join(this.folderPath, fileName);
    const stream = createWriteStream(fullPath);

    return new Promise((resolve, reject) => {
      stream.write(base64);
      stream.on('finish', () => resolve(fullPath));
      stream.on('error', reject);
    });
  }
}
