import { ImageService } from '@/services/ImageService';
import { UserRepository } from '@/repositories/UserRepository';
import { UserCreateDto, UserLoginDto } from '@/utils/dtos/UserDto';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { BranchRepository } from '@/repositories/BranchRepository';
import { RoleRepository } from '@/repositories/RoleRepository';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly branchRepository: BranchRepository,
    private readonly roleRepository: RoleRepository,
    private readonly imageService: ImageService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(data: UserCreateDto) {
    await this.branchRepository.createBranchIfNotExist({ name: data.branch });

    await this.roleRepository.createRoleIfNotExist({ name: data.role });

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const imagePath = data.image
      ? this.imageService.saveImageFromBase64(
          data.image,
          'users',
          `${data.id}.png`,
        )
      : this.imageService.defaultImagePath('users');

    await this.userRepository.createUser({
      ...data,
      password: hashedPassword,
      image: imagePath,
    });
  }

  public async login(data: UserLoginDto) {
    const user = await this.userRepository.getUserByEmail(data.email);

    if (!user) {
      throw new BadRequestException('Invalid Credential');
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new BadRequestException('Invalid Credential');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    return jwt;
  }

  public async me(req: Request) {
    try {
      const cookie = req.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.userRepository.getUserWithRoleAndBranchById(
        data.id,
      );

      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException();
      }
    }
  }
}
