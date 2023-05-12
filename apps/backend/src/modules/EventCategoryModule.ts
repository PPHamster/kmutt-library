import { AuthModule } from '@/modules/AuthModule';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/modules/DatabaseModule';
import { EventCategoryController } from '@/controllers/EventCategoryController';
import { EventCategoryService } from '@/services/EventCategoryService';
import { EventCategoryRepository } from '@/repositories/EventCategoryRepository';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [EventCategoryController],
  providers: [EventCategoryService, EventCategoryRepository],
})
export class EventCategoryModule {}
