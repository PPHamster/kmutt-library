import { BlogService } from '@/services/BlogService';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { User } from 'api-schema';
import { Request } from 'express';

type Params = {
  id: number | undefined;
  tagId: number | undefined;
};

@Injectable()
export class BlogGuard implements CanActivate {
  public constructor(private readonly blogService: BlogService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { params, user } = context.switchToHttp().getRequest<Request>();
    const { id, tagId } = params as unknown as Params;
    const currentUser = user as User;

    const blog = await this.blogService.getBlogById(id);

    if (!blog) {
      throw new BadRequestException(`No blog id ${id}`);
    }

    if (tagId) {
      const bookWithCategory = await this.blogService.getBlogWithTagById(
        blog.id,
        tagId,
      );

      if (!bookWithCategory) {
        throw new BadRequestException(
          `No tag id ${tagId} in blog id ${blog.id}`,
        );
      }
    }

    return (
      currentUser.id === blog.userId ||
      currentUser.role === 'Staff' ||
      currentUser.role === 'Admin'
    );
  }
}
