import { AuthModule } from '@/modules/AuthModule';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/modules/DatabaseModule';
import { TimePeriodController } from '@/controllers/TimePeriodController';
import { TimePeriodService } from '@/services/TimePeriodService';
import { TimePeriodRepository } from '@/repositories/TimePeriodRepository';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [TimePeriodController],
  providers: [TimePeriodService, TimePeriodRepository],
})
export class TimePeriodModule {}
