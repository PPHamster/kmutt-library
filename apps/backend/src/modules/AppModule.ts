import { Module } from '@nestjs/common';
import { AuthModule } from '@/modules/AuthModule';
import { UserModule } from '@/modules/UserModule';
import { OrderModule } from '@/modules/OrderModule';
import { RoleModule } from './RoleModule';
import { BranchModule } from './BranchModule';

@Module({
  imports: [AuthModule, UserModule, RoleModule, BranchModule, OrderModule],
})
export class AppModule {}
