import { Inject, Injectable } from '@nestjs/common';
import { Book, CartItem } from 'api-schema';
import { Connection } from 'mysql2/promise';
@Injectable()
export class CartItemRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async createCartItem(userId: string, bookId: number) {
    await this.connection.query('INSERT INTO CartItem VALUES (?, ?)', [
      userId,
      bookId,
    ]);
  }

  public async getAllCartItemByUserId(userId: string): Promise<CartItem[]> {
    const [rows] = await this.connection.query(
      'SELECT * FROM CartItem WHERE userId = ?',
      [userId],
    );

    return rows as any[] as CartItem[];
  }

  public async getAllCartItemWithInfoByUserId(userId: string): Promise<Book[]> {
    const [rows] = await this.connection.query(
      `
      SELECT b.*, IF(oi.receivedDate IS NOT NULL, 0, 1) AS isReady FROM CartItem AS ci
      LEFT JOIN Book AS b ON ci.bookId = b.id
      LEFT JOIN OrderItem AS oi ON b.id = oi.bookId AND oi.returnedDate IS NULL
      WHERE userId = ?
      `,
      [userId],
    );

    return rows as any[] as Book[];
  }

  public async getItemCanNotAddCartByUserId(userId: string): Promise<Book[]> {
    const [rows] = await this.connection.query(
      `
      SELECT b.* FROM User AS u
      INNER JOIN \`Order\` AS o ON o.userId = u.id
      INNER JOIN OrderItem AS oi ON oi.orderId = o.id AND oi.returnedDate IS NULL
      INNER JOIN Book AS b ON b.id = oi.bookId
      WHERE u.id = ?
      `,
      [userId],
    );

    return rows as any[] as Book[];
  }

  public async deleteCartItemById(userId: string, bookId: number) {
    await this.connection.query(
      'DELETE FROM CartItem WHERE userId = ? AND bookId = ?',
      [userId, bookId],
    );
  }

  public async deleteCartItemByUserId(userId: string) {
    await this.connection.query('DELETE FROM CartItem WHERE userId = ?', [
      userId,
    ]);
  }
}
