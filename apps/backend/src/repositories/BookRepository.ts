import { BookCreateDto, BookUpdateImageDto } from '@/utils/dtos/BookDto';
import { Inject, Injectable } from '@nestjs/common';
import { Book } from 'api-schema';
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

  public async getAllBook(): Promise<Book[]> {
    const [rows] = await this.connection.query(
      `
      SELECT b.*, IF(oi.receivedDate IS NOT NULL, 0, 1) AS isReady FROM Book AS b
      LEFT JOIN OrderItem AS oi ON b.id = oi.bookId AND oi.returnedDate IS NULL
      `,
    );
    return rows as any[] as Book[];
  }

  public async getBookById(id: number): Promise<Book> {
    const [rows] = await this.connection.query(
      `
      SELECT b.*, IF(oi.receivedDate IS NOT NULL, 0, 1) AS isReady FROM Book AS b
      LEFT JOIN OrderItem AS oi ON b.id = oi.bookId AND oi.returnedDate IS NULL
      WHERE id = ?
      `,
      [id],
    );
    return rows[0];
  }

  public async getLatestBook(): Promise<Book> {
    const [rows] = await this.connection.query(
      'SELECT * FROM Book ORDER BY id DESC',
    );

    return rows[0];
  }

  public async getAutoIncrement(): Promise<number> {
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

  public async getBookWithCategoryById(bookId: number, categoryId: number) {
    const [rows] = await this.connection.query(
      `
      SELECT * FROM Book AS b
      INNER JOIN BookCategory AS bc ON b.id = bc.bookId
      INNER JOIN Category AS c ON c.id = bc.categoryId AND c.id = ?
      WHERE b.id = ?
      `,
      [categoryId, bookId],
    );

    return rows[0];
  }

  public async getAllBookEverBorrowedByUserId(userId: string): Promise<Book[]> {
    const [rows] = await this.connection.query(
      `
      SELECT b.* FROM Book AS b
      INNER JOIN OrderItem AS oi ON b.id = oi.bookId AND oi.returnedDate IS NOT NULL
      INNER JOIN \`Order\` AS o ON o.id = oi.orderId AND o.userId = ?
      GROUP BY b.id
      `,
      [userId],
    );

    return rows as any[] as Book[];
  }

  public async getAllBookNotCreatedBlogByUserId(
    userId: string,
  ): Promise<Book[]> {
    const [rows] = await this.connection.query(
      `
      SELECT b.* FROM Book AS b
      INNER JOIN OrderItem AS oi ON oi.bookId = b.id
      INNER JOIN \`Order\` AS o ON o.userId = '64070501061'
      WHERE b.id NOT IN
      (SELECT bl.bookId FROM OrderItem AS oi
      INNER JOIN \`Order\` AS o ON o.id = oi.orderId AND o.userId = '64070501061'
      INNER JOIN Blog AS bl ON bl.userId = '64070501061' AND bl.bookId = oi.bookId
      WHERE oi.returnedDate IS NOT NULL)
      GROUP BY b.id
      ORDER BY b.id
      `,
      [userId, userId, userId],
    );

    return rows as any[] as Book[];
  }

  public async getRecommendBooks(count: number): Promise<Book[]> {
    const [rows] = await this.connection.query(
      `
      SELECT b.*, IF(oi.receivedDate IS NOT NULL, 0, 1) AS isReady FROM (
      SELECT b.* FROM Book AS b
      INNER JOIN OrderItem AS oi ON b.id = oi.bookId
      GROUP BY b.id
      ORDER BY COUNT(*) DESC
      LIMIT ?
      ) AS b
      LEFT JOIN OrderItem AS oi ON b.id = oi.bookId AND oi.returnedDate IS NULL
      `,
      [count],
    );

    return rows as any[] as Book[];
  }

  public async updateBookById(option: string, value: any[], id: number) {
    await this.connection.query(`UPDATE Book SET ${option} WHERE id = ?`, [
      ...value,
      id,
    ]);
  }

  public async updateBookImageById(id: number, data: BookUpdateImageDto) {
    await this.connection.query('UPDATE Book SET image = ? WHERE id = ?', [
      data.image,
      id,
    ]);
  }

  public async deleteBookById(id: number) {
    await this.connection.query('DELETE FROM Book WHERE id = ?', [id]);
  }

  public async deleteCategoryFromBookById(bookId: number, categoryId: number) {
    await this.connection.query(
      'DELETE FROM BookCategory WHERE bookId = ? AND categoryId = ?',
      [bookId, categoryId],
    );
  }
}
