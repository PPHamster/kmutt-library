import { EventCategoryService } from '@/services/EventCategoryService';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';

type Params = {
  id: number | undefined;
};

@Injectable()
export class EventCategoryGuard implements CanActivate {
  public constructor(
    private readonly eventCategoryService: EventCategoryService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { params } = context.switchToHttp().getRequest<Request>();
    const { id } = params as unknown as Params;

    const eventCategory = await this.eventCategoryService.getEventCategoryById(
      id,
    );

    if (!eventCategory) {
      throw new BadRequestException(`No event category id ${id}`);
    }

    return true;
  }
}
