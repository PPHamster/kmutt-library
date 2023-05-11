import { AuthModule } from '@/modules/AuthModule';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/modules/DatabaseModule';
import { EventController } from '@/controllers/EventController';
import { EventService } from '@/services/EventService';
import { EventCategoryService } from '@/services/EventCategoryService';
import { EventRepository } from '@/repositories/EventRepository';
import { EventCategoryRepository } from '@/repositories/EventCategoryRepository';
import { ImageService } from '@/services/ImageService';
import { EventMemberRepository } from '@/repositories/EventMemberRepository';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [EventController],
  providers: [
    ImageService,
    EventService,
    EventCategoryService,

    EventRepository,
    EventCategoryRepository,
    EventMemberRepository,
  ],
})
export class EventModule {}
