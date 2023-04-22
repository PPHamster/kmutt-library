import { BookService } from '@/services/BookService';
import { CartItemService } from '@/services/CartItemService';
import { BookCreateDto } from '@/utils/dtos/BookDto';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import { BookGuard } from '@/utils/guards/BookGuard';
import { StaffGuard } from '@/utils/guards/StaffGuard';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('books')
export class BookController {
  public constructor(
    private readonly bookService: BookService,
    private readonly cartItemService: CartItemService,
  ) {}

  @Post()
  @UseGuards(AuthGuard, StaffGuard)
  public async createBook(@Body() body: BookCreateDto, @Res() res: Response) {
    await this.bookService.createBook(body);
    return res
      .status(HttpStatus.CREATED)
      .json({ msg: `Create book name ${body.title} successfully` });
  }

  @Get()
  public async getAllBook(@Res() res: Response) {
    const books = await this.bookService.getAllBook();
    return res.status(HttpStatus.OK).json(books);
  }

  @Get(':id')
  @UseGuards(BookGuard)
  public async getBookById(@Param('id') id: number, @Res() res: Response) {
    const book = await this.bookService.getBookById(id);
    return res.status(HttpStatus.OK).json(book);
  }
}
