import { CategoryService } from '@/services/CategoryService';
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
export class CategoryGuard implements CanActivate {
  public constructor(private readonly categoryService: CategoryService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { params } = context.switchToHttp().getRequest<Request>();
    const { id } = params as unknown as Params;

    const category = await this.categoryService.getCategoryById(id);

    if (!category) {
      throw new BadRequestException(`No category id ${id}`);
    }

    return true;
  }
}
