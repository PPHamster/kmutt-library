import { ImageService } from '@/services/ImageService';
import { UserRepository } from '@/repositories/UserRepository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { BranchRepository } from '@/repositories/BranchRepository';
import { RoleRepository } from '@/repositories/RoleRepository';
import { UserUpdateImageDto } from '@/utils/dtos/UserDto';

@Injectable()
export class UserService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly branchRepository: BranchRepository,
    private readonly roleRepository: RoleRepository,
    private readonly imageService: ImageService,
  ) {}

  public async getUserById(id: string) {
    const user = await this.userRepository.getUserWithRoleAndBranchById(id);
    if (!user) throw new BadRequestException();
    return user;
  }

  public async getAllUserWithRoleAndBranch() {
    const users = await this.userRepository.getAllUserWithRoleAndBranch();
    return users;
  }

  public async deleteUserById(id: string) {
    await this.userRepository.deleteUserById(id);

    this.imageService.deleteImageFromName('users', `${id}.png`);
  }

  public async updateUserImageById(data: UserUpdateImageDto, id: string) {
    const imagePath = this.imageService.saveImageFromBase64(
      data.image,
      'users',
      `${id}.png`,
    );

    await this.userRepository.updateUserImageById({ image: imagePath }, id);
  }

  public async deleteUserImageById(id: string) {
    const imagePath = this.imageService.defaultImagePath('users');

    await this.userRepository.updateUserImageById({ image: imagePath }, id);

    this.imageService.deleteImageFromName('users', `${id}.png`);
  }
}
