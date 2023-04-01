import { UserRepository } from '@/repositories/UserRepository';
import { UserCreateDto } from '@/utils/dtos/UserDto';
import { Injectable } from '@nestjs/common';
import { User } from 'api-schema';

@Injectable()
export class AuthService {
  public constructor(private readonly userRepository: UserRepository) {}

  public async createNewUser(data: UserCreateDto): Promise<User> {
    
  }
}
