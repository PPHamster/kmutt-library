import { TagService } from '@/services/TagService';
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
export class TagGuard implements CanActivate {
  public constructor(private readonly tagService: TagService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { params } = context.switchToHttp().getRequest<Request>();
    const { id } = params as unknown as Params;

    const tag = await this.tagService.getTagById(id);

    if (!tag) {
      throw new BadRequestException(`No tag id ${id}`);
    }

    return true;
  }
}
