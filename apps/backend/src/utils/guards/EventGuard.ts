import { EventService } from '@/services/EventService';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { User } from 'api-schema';
import { Request } from 'express';

type Params = {
  id: number | undefined;
  eventCategoryId: number | undefined;
};

type Query = {
  userId: string | undefined;
};

@Injectable()
export class EventGuard implements CanActivate {
  public constructor(private readonly eventService: EventService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { params, query, method, user, url } = context
      .switchToHttp()
      .getRequest<Request>();

    const { id, eventCategoryId } = params as unknown as Params;
    const { userId } = query as unknown as Query;
    const currentUser = user as User;

    const event = await this.eventService.getEventById(id);

    if (!event) {
      throw new BadRequestException(`No event id ${id}`);
    }

    if (eventCategoryId) {
      const eventWithCategory =
        await this.eventService.getEventWithCategoryById(
          event.id,
          eventCategoryId,
        );

      if (!eventWithCategory) {
        throw new BadRequestException(
          `No category id ${eventCategoryId} in event id ${id}`,
        );
      }
    }

    const urlSplit = url.split('/');

    if (urlSplit[urlSplit.length - 1] === 'join') {
      const eventMember = await this.eventService.getMemberById(
        event.id,
        currentUser.id,
      );

      if (method === 'POST' && eventMember) {
        throw new BadRequestException('You are already join in this event');
      }

      if (method === 'DELETE' && !eventMember) {
        throw new BadRequestException(
          `No member id ${currentUser.id} in this event`,
        );
      }
    }

    if (userId) {
      if (currentUser.role !== 'Staff' && currentUser.role !== 'Admin') {
        throw new ForbiddenException(
          "You don't have permission to manage member",
        );
      }

      const eventMember = await this.eventService.getMemberById(
        event.id,
        userId,
      );

      if (method === 'POST' && eventMember) {
        throw new BadRequestException('You are already join in this event');
      }

      if (method === 'DELETE' && !eventMember) {
        throw new BadRequestException(`No member id ${userId} in this event`);
      }
    }

    return true;
  }
}
