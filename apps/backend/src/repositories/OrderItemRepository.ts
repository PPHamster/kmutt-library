import { Inject, Injectable } from '@nestjs/common';
import { OrderItem, OrderItemJoinBook, SendEmailInfo } from 'api-schema';
import { Connection } from 'mysql2/promise';

@Injectable()
export class OrderItemRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async createNewOrderItems(query: string, value: number[]) {
    await this.connection.query(
      `INSERT INTO OrderItem (orderId, bookId) VALUES ${query}`,
      value,
    );
  }

  public async getOrderItemsByOrderId(
    orderId: number,
  ): Promise<OrderItemJoinBook[]> {
    const [rows] = await this.connection.query(
      `
      SELECT b.*, oi.latestNotify, oi.receivedDate, oi.returnedDate
      FROM OrderItem AS oi
      LEFT JOIN Book AS b ON oi.bookId = b.id
      WHERE oi.orderId = ?
      `,
      [orderId],
    );
    return rows as any[] as OrderItemJoinBook[];
  }

  public async getOrderItemById(
    orderId: number,
    bookId: number,
  ): Promise<OrderItem> {
    const [rows] = await this.connection.query(
      'SELECT * FROM OrderItem WHERE orderId = ? AND bookId = ?',
      [orderId, bookId],
    );

    return rows[0];
  }

  public async getBorrowedItemByBookId(bookId: number): Promise<OrderItem> {
    const [rows] = await this.connection.query(
      'SELECT * FROM OrderItem WHERE bookId = ? AND receivedDate IS NOT NULL AND returnedDate IS NULL',
      [bookId],
    );

    return rows[0];
  }

  public async getAllItemInQueueByBookId(bookId: number): Promise<OrderItem[]> {
    const [rows] = await this.connection.query(
      'SELECT * FROM OrderItem WHERE bookId = ? AND receivedDate IS NULL',
      [bookId],
    );

    return rows as any[] as OrderItem[];
  }

  public async getBookDetailAndEmailFromOrderItemId(
    orderId: number,
    bookId: number,
  ): Promise<SendEmailInfo> {
    const [rows] = await this.connection.query(
      `
      SELECT b.id, b.title, b.image, u.email FROM \`OrderItem\` AS oi
      LEFT JOIN Book AS b ON oi.bookId = b.id
      LEFT JOIN \`Order\` AS o ON o.id = oi.orderId
      LEFT JOIN \`User\` AS u ON o.userId = u.id
      WHERE oi.orderId = ? AND oi.bookId = ?
      `,
      [orderId, bookId],
    );

    return rows[0];
  }

  public async getOrderItemCountByUserId(userId: string): Promise<number> {
    const [rows] = await this.connection.query(
      `
      SELECT COUNT(*) AS count FROM \`Order\` AS o
      INNER JOIN OrderItem AS oi ON o.id = oi.orderId AND oi.returnedDate IS NULL
      LEFT JOIN User AS u ON o.userId = u.id
      WHERE u.id = ?;
      `,
      [userId],
    );
    return rows[0].count;
  }

  public async updateOrderItemById(
    orderId: number,
    bookId: number,
    query: string,
    value: any[],
  ) {
    await this.connection.query(
      `UPDATE OrderItem SET ${query} WHERE orderId = ? AND bookId = ?`,
      [...value, orderId, bookId],
    );
  }

  public async deleteOrderItemById(orderId: number, bookId: number) {
    await this.connection.query(
      'DELETE FROM OrderItem WHERE orderId = ? AND bookId = ?',
      [orderId, bookId],
    );
  }
}
