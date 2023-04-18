import { AuthModule } from './AuthModule';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './DatabaseModule';
import { BranchController } from '@/controllers/BranchController';
import { BranchService } from '@/services/BranchService';
import { BranchRepository } from '@/repositories/BranchRepository';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [BranchController],
  providers: [BranchService, BranchRepository],
})
export class BranchModule {}
