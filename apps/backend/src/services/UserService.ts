import * as bcrypt from 'bcrypt';
import { ImageService } from '@/services/ImageService';
import { UserRepository } from '@/repositories/UserRepository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { BranchRepository } from '@/repositories/BranchRepository';
import { RoleRepository } from '@/repositories/RoleRepository';
import {
  UserUpdateByAdminDto,
  UserUpdateDto,
  UserUpdateImageDto,
} from '@/utils/dtos/UserDto';

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

  public async updateUserById(data: UserUpdateDto, id: string) {
    if (Object.keys(data).length === 0) throw new BadRequestException();

    if (data.password) {
      data = { ...data, password: await bcrypt.hash(data.password, 12) };
    }

    const value = [];
    const updateQuery = Object.keys(data)
      .map((key) => {
        value.push(data[key]);
        return `${key} = ?`;
      })
      .join(', ');

    await this.userRepository.updateUserById(updateQuery, value, id);
  }

  public async updateUserByIdFromAdmin(data: UserUpdateByAdminDto, id: string) {
    if (Object.keys(data).length === 0) throw new BadRequestException();

    if (data.password) {
      data = { ...data, password: await bcrypt.hash(data.password, 12) };
    }

    if (data.role) {
      await this.roleRepository.createRoleIfNotExist({ name: data.role });
    }

    if (data.branch) {
      await this.branchRepository.createBranchIfNotExist({ name: data.branch });
    }

    const value = [];
    const updateQuery = Object.keys(data)
      .map((key) => {
        value.push(data[key]);
        if (key === 'role' || key === 'branch') {
          const keyUpperCase = key.charAt(0).toUpperCase() + key.slice(1);
          return `${key}Id = (SELECT id FROM ${keyUpperCase} WHERE name = ?)`;
        }
        return `${key} = ?`;
      })
      .join(', ');

    await this.userRepository.updateUserById(updateQuery, value, id);
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
