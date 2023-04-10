import { Injectable } from '@nestjs/common';
import { writeFileSync, unlinkSync } from 'fs';
import * as path from 'path';

type Folder = 'books' | 'events' | 'rooms' | 'users';
@Injectable()
export class ImageService {
  public readonly folderPath = path.join(__dirname, '../../images');

  public defaultImagePath(folder: Folder): string {
    return path.join(this.folderPath, folder, 'default.png');
  }

  public saveImageFromBase64(
    base64: string,
    folderName: Folder,
    fileName: string,
  ): string {
    const fullPath = path.join(this.folderPath, folderName, fileName);
    const buffer = Buffer.from(base64, 'base64');
    writeFileSync(fullPath, buffer);

    return fullPath;
  }

  public deleteImageFromName(folderName: Folder, fileName: string): void {
    const fullPath = path.join(this.folderPath, folderName, fileName);
    try {
      unlinkSync(fullPath);
    } catch (err) {}
  }
}
