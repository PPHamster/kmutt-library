import { BookService } from '@/services/BookService';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';

type Params = {
  id: number | undefined;
  categoryId: number | undefined;
};

@Injectable()
export class BookGuard implements CanActivate {
  public constructor(private readonly bookService: BookService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { params } = context.switchToHttp().getRequest<Request>();
    const { id, categoryId } = params as unknown as Params;

    const book = await this.bookService.getBookById(id);

    if (!book) {
      throw new BadRequestException(`No book id ${id}`);
    }

    if (categoryId) {
      const bookWithCategory = await this.bookService.getBookWithCategoryById(
        book.id,
        categoryId,
      );

      if (!bookWithCategory) {
        throw new BadRequestException(
          `No category id ${categoryId} in book id ${id}`,
        );
      }
    }

    return true;
  }
}
