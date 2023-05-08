import { RoomService } from '@/services/RoomService';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import {
  BookingRoomCreateDto,
  BookingRoomDeleteDto,
} from '@/utils/dtos/RoomDto';
import { User } from 'api-schema';

type Params = {
  id: number | undefined;
  timePeriodId: number | undefined;
  roomTimePeriodId: number | undefined;
};

@Injectable()
export class RoomGuard implements CanActivate {
  public constructor(private readonly roomService: RoomService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { params, method, user, body, url } = context
      .switchToHttp()
      .getRequest<Request>();

    const { id, timePeriodId } = params as unknown as Params;

    const room = await this.roomService.getRoomById(id);

    if (!room) {
      throw new BadRequestException(`No room id ${id}`);
    }

    if (timePeriodId) {
      const roomWithTimePeriod =
        await this.roomService.getRoomWithTimePeriodById(room.id, timePeriodId);

      if (!roomWithTimePeriod) {
        throw new BadRequestException(
          `No time period id ${timePeriodId} in room id ${id}`,
        );
      }

      const urlSplit = url.split('/');

      if (urlSplit[urlSplit.length - 1] === 'book') {
        const currentUser = user as User;

        if (method === 'POST') {
          const data = body as BookingRoomCreateDto;

          const bookingRoom =
            await this.roomService.getBookingRoomByRoomAndTimePeriodId(
              room.id,
              timePeriodId,
              data.date,
            );

          if (bookingRoom) {
            throw new BadRequestException('Room in this time has been booking');
          }

          if (currentUser.role !== 'Admin' && currentUser.role !== 'Staff') {
            if (!data.userIds.some((userId) => currentUser.id === userId)) {
              throw new BadRequestException("Don't have owner in booking list");
            }
          }
        }

        if (method === 'DELETE') {
          const data = body as BookingRoomDeleteDto;

          const bookingRoom =
            await this.roomService.getBookingRoomByRoomAndTimePeriodId(
              room.id,
              timePeriodId,
              data.date,
            );

          if (!bookingRoom) {
            throw new BadRequestException(
              'Room in this time not ever been booking',
            );
          }

          const member = await this.roomService.getOneMemberFromBookingRoomId(
            currentUser.id,
            bookingRoom.id,
          );

          if (
            currentUser.role !== 'Admin' &&
            currentUser.role !== 'Staff' &&
            !member
          ) {
            throw new BadRequestException(
              "Don't have this user in booking room",
            );
          }
        }
      }
    }

    return true;
  }
}
