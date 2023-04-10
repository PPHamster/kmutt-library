import { AuthController } from '@/controllers/AuthController';
import { UserRepository } from '@/repositories/UserRepository';
import { AuthService } from '@/services/AuthService';
import { ImageService } from '@/services/ImageService';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/modules/DatabaseModule';
import { JwtModule } from '@nestjs/jwt';
import { BranchRepository } from '@/repositories/BranchRepository';
import { RoleRepository } from '@/repositories/RoleRepository';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ImageService,
    UserRepository,
    BranchRepository,
    RoleRepository,
  ],
  exports: [AuthService],
})
export class AuthModule {}
