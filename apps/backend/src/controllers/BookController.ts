import { BookService } from '@/services/BookService';
import { CartItemService } from '@/services/CartItemService';
import { RequestUser } from '@/utils/decorators/AuthDecorator';
import {
  BookCreateDto,
  BookUpdateDto,
  BookUpdateImageDto,
} from '@/utils/dtos/BookDto';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import { BookGuard } from '@/utils/guards/BookGuard';
import { StaffGuard } from '@/utils/guards/StaffGuard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { User } from 'api-schema';
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

  @Get('cart')
  @UseGuards(AuthGuard)
  public async getAllCartItem(@RequestUser() user: User, @Res() res: Response) {
    const cartItem = await this.cartItemService.getAllCartItemWithInfoByUserId(
      user.id,
    );

    return res.status(HttpStatus.OK).json(cartItem);
  }

  @Get(':id')
  @UseGuards(BookGuard)
  public async getBookById(@Param('id') id: number, @Res() res: Response) {
    const book = await this.bookService.getBookById(id);
    return res.status(HttpStatus.OK).json(book);
  }

  @Put(':id')
  @UseGuards(AuthGuard, StaffGuard, BookGuard)
  public async updateBookById(
    @Param('id') id: number,
    @Body() body: BookUpdateDto,
    @Res() res: Response,
  ) {
    await this.bookService.updateBookById(id, body);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Update book id ${id} successfully` });
  }

  @Put(':id/image')
  @UseGuards(AuthGuard, StaffGuard, BookGuard)
  public async updateBookImageById(
    @Param('id') id: number,
    @Body() body: BookUpdateImageDto,
    @Res() res: Response,
  ) {
    await this.bookService.updateBookImageById(id, body);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Update book image id ${id} successfully` });
  }

  @Put(':id/select')
  @UseGuards(AuthGuard, BookGuard)
  public async selectBookToCart(
    @RequestUser() user: User,
    @Param('id') bookId: number,
    @Res() res: Response,
  ) {
    await this.cartItemService.createCartItem(user.id, bookId);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Select book id ${bookId} successfully` });
  }

  @Delete(':id')
  @UseGuards(AuthGuard, StaffGuard, BookGuard)
  public async deleteBookById(@Param('id') id: number, @Res() res: Response) {
    await this.bookService.deleteBookById(id);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Delete book id ${id} successfully` });
  }

  @Delete(':id/select')
  @UseGuards(AuthGuard, BookGuard)
  public async deleteBookInCartById(
    @RequestUser() user: User,
    @Param('id') bookId: number,
    @Res() res: Response,
  ) {
    await this.cartItemService.deleteCartItemById(user.id, bookId);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Delete book id ${bookId} in cart successfully` });
  }
}