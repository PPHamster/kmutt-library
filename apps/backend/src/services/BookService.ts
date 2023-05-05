import { BookRepository } from '@/repositories/BookRepository';
import { CategoryRepository } from '@/repositories/CategoryRepository';
import {
  BookAddCategoryDto,
  BookCreateDto,
  BookUpdateDto,
  BookUpdateImageDto,
} from '@/utils/dtos/BookDto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ImageService } from '@/services/ImageService';
import { OrderItemRepository } from '@/repositories/OrderItemRepository';
import { BookWithCategories } from 'api-schema';

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

    const categories = await this.categoryRepository.getAllCategory();

    const categoriesName = categories.map((category) => category.name);

    const bookValues: string[] = [];
    const bookQuery = data.categories
      .filter((category) => {
        return !categoriesName.includes(category);
      })
      .map((category) => {
        bookValues.push(category);
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

    if (bookValues.length > 0) {
      await this.categoryRepository.createManyCategories(bookQuery, bookValues);
    }

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

  public async addCategoryById(bookId: number, data: BookAddCategoryDto) {
    await this.categoryRepository.createCategory(data);

    await this.categoryRepository.createBookCategory(
      '(?, (SELECT id FROM Category WHERE name = ?))',
      [bookId, data.name],
    );
  }

  public async getAllBook(): Promise<BookWithCategories[]> {
    const books = await this.bookRepository.getAllBook();
    const booksWithCategory: BookWithCategories[] = [];
    for (const book of books) {
      const categories = await this.categoryRepository.getAllCategoryByBookId(
        book.id,
      );

      booksWithCategory.push({
        ...book,
        categories,
      });
    }

    return booksWithCategory;
  }

  public async getBookById(id: number) {
    return this.bookRepository.getBookById(id);
  }

  public async getBookWithCategoriesById(
    id: number,
  ): Promise<BookWithCategories> {
    const book = await this.bookRepository.getBookById(id);

    const categories = await this.categoryRepository.getAllCategoryByBookId(id);

    const bookWithCategories = {
      ...book,
      categories,
    };

    return bookWithCategories;
  }

  public async getBookWithCategoryById(bookId: number, categoryId: number) {
    return this.bookRepository.getBookWithCategoryById(bookId, categoryId);
  }

  public async getAllBookEverBorrowedByUserId(userId: string) {
    return this.bookRepository.getAllBookEverBorrowedByUserId(userId);
  }

  public async getAllBookNotCreatedBlogByUserId(userId: string) {
    return this.bookRepository.getAllBookNotCreatedBlogByUserId(userId);
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
    const imagePath = this.imageService.saveImageFromBase64(
      data.image,
      'books',
      `${id}.png`,
    );

    await this.bookRepository.updateBookImageById(id, { image: imagePath });
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

  public async deleteCategoryFromBookById(bookId: number, categoryId: number) {
    return this.bookRepository.deleteCategoryFromBookById(bookId, categoryId);
  }
}
