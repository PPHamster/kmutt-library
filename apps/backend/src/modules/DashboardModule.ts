import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/modules/DatabaseModule';
import { AuthModule } from '@/modules/AuthModule';
import { DashboardController } from '@/controllers/DashboardController';
import { DashboardService } from '@/services/DashboardService';
import { DashboardRepository } from '@/repositories/DashboardRepository';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [DashboardController],
  providers: [DashboardService, DashboardRepository],
})
export class DashboardModule {}
