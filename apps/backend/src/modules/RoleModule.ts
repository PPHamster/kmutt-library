import { AuthModule } from '@/modules/AuthModule';
import { RoleController } from '@/controllers/RoleController';
import { RoleService } from '@/services/RoleService';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/modules/DatabaseModule';
import { RoleRepository } from '@/repositories/RoleRepository';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
})
export class RoleModule {}
