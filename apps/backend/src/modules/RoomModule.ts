import { AuthModule } from '@/modules/AuthModule';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/modules/DatabaseModule';
import { RoomController } from '@/controllers/RoomController';
import { ImageService } from '@/services/ImageService';
import { RoomService } from '@/services/RoomService';
import { RoomRepository } from '@/repositories/RoomRepository';
import { TimePeriodRepository } from '@/repositories/TimePeriodRepository';
import { BookingRoomRepository } from '@/repositories/BookingRoomRepository';
import { BookingMemberRepository } from '@/repositories/BookingMemberRepository';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [RoomController],
  providers: [
    ImageService,
    RoomService,

    RoomRepository,
    TimePeriodRepository,
    BookingRoomRepository,
    BookingMemberRepository,
  ],
})
export class RoomModule {}
