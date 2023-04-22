import { BookRepository } from '@/repositories/BookRepository';
import { CategoryRepository } from '@/repositories/CategoryRepository';
import { BookCreateDto } from '@/utils/dtos/BookDto';
import { Injectable } from '@nestjs/common';
import { ImageService } from '@/services/ImageService';

@Injectable()
export class BookService {
  public constructor(
    private readonly imageService: ImageService,
    private readonly bookRepository: BookRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  public async createBook(data: BookCreateDto) {
    const latestId = await this.bookRepository.getAutoIncrement();
    const imagePath = this.imageService.saveImageFromBase64(
      data.image,
      'books',
      `${latestId + 1}.png`,
    );

    await this.bookRepository.createBook({ ...data, image: imagePath });

    const bookValues: string[] = [];
    const bookQuery = data.categories
      .map((cat) => {
        bookValues.push(cat);
        return '(?)';
      })
      .join(', ');

    await this.categoryRepository.createManyCategories(bookQuery, bookValues);

    const latestBook = await this.bookRepository.getLatestBook();
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
}
