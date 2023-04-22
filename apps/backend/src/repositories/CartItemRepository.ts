import { Inject, Injectable } from '@nestjs/common';
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

  public async getAllCartItemByUserId(userId: string) {
    const [rows] = await this.connection.query(
      'SELECT * FROM CartItem WHERE userId = ?',
      [userId],
    );

    return rows as any[];
  }

  public async getAllCartItemWithInfoByUserId(userId: string) {
    const [rows] = await this.connection.query(
      `
      SELECT b.* FROM CartItem AS ci
      LEFT JOIN Book AS b ON ci.bookId = b.id
      WHERE userId = ?
      `,
      [userId],
    );

    return rows;
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
