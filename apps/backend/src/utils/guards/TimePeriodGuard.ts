import { TimePeriodService } from '@/services/TimePeriodService';
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
export class TimePeriodGuard implements CanActivate {
  public constructor(private readonly timePeriodService: TimePeriodService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { params } = context.switchToHttp().getRequest<Request>();
    const { id } = params as unknown as Params;

    const timePeriod = await this.timePeriodService.getTimePeriodById(id);

    if (!timePeriod) {
      throw new BadRequestException(`No time period id ${id}`);
    }

    return true;
  }
}
