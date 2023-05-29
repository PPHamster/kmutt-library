import { UserRepository } from '@/repositories/UserRepository';
import { ImageService } from '@/services/ImageService';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/modules/DatabaseModule';
import { BranchRepository } from '@/repositories/BranchRepository';
import { RoleRepository } from '@/repositories/RoleRepository';
import { UserController } from '@/controllers/UserController';
import { UserService } from '@/services/UserService';
import { AuthModule } from '@/modules/AuthModule';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UserController],
  providers: [
    ImageService,
    UserService,
    UserRepository,
    BranchRepository,
    RoleRepository,
  ],
})
export class UserModule {}
