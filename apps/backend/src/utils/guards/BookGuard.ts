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
};

@Injectable()
export class BookGuard implements CanActivate {
  public constructor(private readonly bookService: BookService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { params } = context.switchToHttp().getRequest<Request>();
    const { id } = params as unknown as Params;

    const book = await this.bookService.getBookById(id);

    if (!book) {
      throw new BadRequestException(`No book id ${id}`);
    }

    return true;
  }
}
