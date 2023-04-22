import { BookCreateDto } from '@/utils/dtos/BookDto';
import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
@Injectable()
export class BookRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async createBook(data: BookCreateDto) {
    await this.connection.query(
      `
      INSERT INTO Book
      VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?, ?)
      `,
      [
        0,
        data.title,
        data.author,
        data.description,
        data.isbn,
        data.publisher,
        data.publishDate,
        data.language,
        data.image,
        data.location,
      ],
    );
  }

  public async getAllBook() {
    const [rows] = await this.connection.query('SELECT * FROM Book');
    return rows as any[];
  }

  public async getBookById(id: number) {
    const [rows] = await this.connection.query(
      'SELECT * FROM Book WHERE id = ?',
      [id],
    );
    return rows[0];
  }

  public async getLatestBook() {
    const [rows] = await this.connection.query(
      'SELECT * FROM Book ORDER BY id DESC',
    );

    return rows[0];
  }

  public async getAutoIncrement() {
    const [rows] = await this.connection.query(
      `
      SELECT \`AUTO_INCREMENT\`
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = 'kmutt-library'
      AND TABLE_NAME = 'Book';
      `,
    );
    return rows[0].AUTO_INCREMENT;
  }

  public async updateBookById(option: string, value: any[], id: number) {
    await this.connection.query(`UPDATE Book SET ${option} WHERE id = ?`, [
      ...value,
      id,
    ]);
  }

  public async deleteBookById(id: number) {
    await this.connection.query('DELETE FROM Book WHERE id = ?', [id]);
  }
}
