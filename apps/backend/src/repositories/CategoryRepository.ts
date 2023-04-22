import { CategoryCreateDto, CategoryUpdateDto } from '@/utils/dtos/CategoryDto';
import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
@Injectable()
export class CategoryRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async createCategory(data: CategoryCreateDto) {
    await this.connection.query(
      'INSERT IGNORE INTO Category (name) VALUES (?)',
      [data.name],
    );
  }

  public async createManyCategories(query: string, values: string[]) {
    await this.connection.query(
      `INSERT IGNORE INTO Category (name) VALUES ${query}`,
      values,
    );
  }

  public async createBookCategory(query: string, values: any[]) {
    await this.connection.query(
      `INSERT IGNORE INTO BookCategory VALUES ${query}`,
      values,
    );
  }

  public async getAllCategory() {
    const [rows] = await this.connection.query('SELECT * FROM Category');
    return rows;
  }

  public async getCategoryById(id: number) {
    const [rows] = await this.connection.query(
      'SELECT * FROM Category WHERE id = ?',
      [id],
    );

    return rows[0];
  }

  public async getAllCategoryByBookId(bookId: number) {
    const [rows] = await this.connection.query(
      `
      SELECT c.name FROM Book AS b
      LEFT JOIN BookCategory AS bc ON b.id = bc.bookId
      LEFT JOIN Category AS c ON bc.categoryId = c.id
      WHERE b.id = ?
      `,
      [bookId],
    );

    return rows as any[];
  }

  public async updateCategoryById(id: number, data: CategoryUpdateDto) {
    await this.connection.query('UPDATE Category SET name = ? WHERE id = ?', [
      data.name,
      id,
    ]);
  }

  public async deleteCategoryById(id: number) {
    await this.connection.query('DELETE FROM Category WHERE id = ?', [id]);
  }
}
