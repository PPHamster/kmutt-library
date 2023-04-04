import { ImageService } from '@/services/ImageService';
import { UserRepository } from '@/repositories/UserRepository';
import { UserCreateDto } from '@/utils/dtos/UserDto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly imageService: ImageService,
  ) {}

  public async register(data: UserCreateDto) {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const imagePath = data.image
      ? await this.imageService.saveImageFromBase64(
          data.image,
          `${data.id}.png`,
        )
      : `${this.imageService.folderPath}/avatar.png`;

    return this.userRepository.createUser({
      ...data,
      password: hashedPassword,
      image: imagePath,
    });
  }
}
