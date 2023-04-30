import { CategoryCreateDto, CategoryUpdateDto } from '@/utils/dtos/CategoryDto';
import { Inject, Injectable } from '@nestjs/common';
import { Category } from 'api-schema';
import { Connection } from 'mysql2/promise';
@Injectable()
export class CategoryRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async createCategory(data: CategoryCreateDto) {
    await this.connection.query(
      'INSERT INTO Category (name) SELECT ? WHERE NOT EXISTS (SELECT * FROM Category WHERE name = ?)',
      [data.name, data.name],
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

  public async getAllCategory(): Promise<Category[]> {
    const [rows] = await this.connection.query('SELECT * FROM Category');
    return rows as any[] as Category[];
  }

  public async getCategoryById(id: number): Promise<Category> {
    const [rows] = await this.connection.query(
      'SELECT * FROM Category WHERE id = ?',
      [id],
    );

    return rows[0];
  }

  public async getAllCategoryByBookId(bookId: number): Promise<Category[]> {
    const [rows] = await this.connection.query(
      `
      SELECT c.* FROM Book AS b
      LEFT JOIN BookCategory AS bc ON b.id = bc.bookId
      LEFT JOIN Category AS c ON bc.categoryId = c.id
      WHERE b.id = ?
      `,
      [bookId],
    );

    return rows as any[] as Category[];
  }

  public async getAllCategoryNotInBookById(
    bookId: number,
  ): Promise<Category[]> {
    const [rows] = await this.connection.query(
      `
      SELECT * FROM Category WHERE id NOT IN
      (SELECT bc.categoryId FROM Book AS b
      LEFT JOIN BookCategory AS bc ON b.id = bc.bookId
      WHERE b.id = ?)
      ORDER BY id
      `,
      [bookId],
    );

    return rows as any[] as Category[];
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
