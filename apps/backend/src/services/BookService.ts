import { BookRepository } from '@/repositories/BookRepository';
import { CategoryRepository } from '@/repositories/CategoryRepository';
import {
  BookCreateDto,
  BookUpdateDto,
  BookUpdateImageDto,
} from '@/utils/dtos/BookDto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ImageService } from '@/services/ImageService';
import { OrderItemRepository } from '@/repositories/OrderItemRepository';

@Injectable()
export class BookService {
  public constructor(
    private readonly imageService: ImageService,
    private readonly bookRepository: BookRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly orderItemRepository: OrderItemRepository,
  ) {}

  public async createBook(data: BookCreateDto) {
    const imageDefault = this.imageService.defaultImagePath('books');

    await this.bookRepository.createBook({ ...data, image: imageDefault });

    const bookValues: string[] = [];
    const bookQuery = data.categories
      .map((cat) => {
        bookValues.push(cat);
        return '(?)';
      })
      .join(', ');

    const latestBook = await this.bookRepository.getLatestBook();

    const imagePath = this.imageService.saveImageFromBase64(
      data.image,
      'books',
      `${latestBook.id}.png`,
    );

    await this.bookRepository.updateBookImageById(latestBook.id, {
      image: imagePath,
    });

    await this.categoryRepository.createManyCategories(bookQuery, bookValues);

    const categoryValues: any[] = [];
    const categoryQuery = data.categories
      .map((cat) => {
        categoryValues.push(latestBook.id, cat);
        return `(?, (SELECT id FROM Category WHERE name = ?))`;
      })
      .join(', ');

    await this.categoryRepository.createBookCategory(
      categoryQuery,
      categoryValues,
    );
  }

  public async getAllBook() {
    const books = await this.bookRepository.getAllBook();
    const booksWithCategory = [];
    for (const book of books) {
      const categories = await this.categoryRepository.getAllCategoryByBookId(
        book.id,
      );

      booksWithCategory.push({
        ...book,
        categories: categories.map((category) => {
          return category.name;
        }),
      });
    }

    return booksWithCategory;
  }

  public async getBookById(id: number) {
    const book = await this.bookRepository.getBookById(id);
    return book;
  }

  public async getBookWithCategoriesById(id: number) {
    const book = await this.bookRepository.getBookById(id);

    const categories = await this.categoryRepository.getAllCategoryByBookId(id);

    const bookWithCategories = {
      ...book,
      categories: categories.map((category) => {
        return category.name;
      }),
    };

    return bookWithCategories;
  }

  public async updateBookById(id: number, data: BookUpdateDto) {
    if (Object.keys(data).length === 0)
      throw new BadRequestException('No data that want to update');

    const values = [];
    const updateQuery = Object.keys(data)
      .map((key) => {
        values.push(data[key]);
        return `${key} = ?`;
      })
      .join(', ');

    await this.bookRepository.updateBookById(updateQuery, values, id);
  }

  public async updateBookImageById(id: number, data: BookUpdateImageDto) {
    this.imageService.saveImageFromBase64(data.image, 'books', `${id}.png`);
  }

  public async deleteBookById(id: number) {
    if (await this.orderItemRepository.getBorrowedItemByBookId(id)) {
      throw new BadRequestException(
        "Can't delete book that have been borrowed",
      );
    }

    await this.bookRepository.deleteBookById(id);

    this.imageService.deleteImageFromName('books', `${id}.png`);
  }
}
