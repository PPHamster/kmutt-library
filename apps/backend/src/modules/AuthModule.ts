import { AuthController } from '@/controllers/AuthController';
import { UserRepository } from '@/repositories/UserRepository';
import { AuthService } from '@/services/AuthService';
import { ImageService } from '@/services/ImageService';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ImageService, UserRepository],
})
export class AuthModule {}
