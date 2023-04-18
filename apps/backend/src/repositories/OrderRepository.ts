import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';

@Injectable()
export class OrderRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async createNewOrder(userId: string) {
    await this.connection.query('INSERT INTO `Order` (userId) VALUES (?)', [
      userId,
    ]);
  }

  public async getAllOrderByUserId(userId: string) {
    const [rows] = await this.connection.query(
      'SELECT * FROM `Order` WHERE userId = (?)',
      [userId],
    );

    return rows as any[];
  }

  public async getOrderById(id: number) {
    const [rows] = await this.connection.query(
      'SELECT * FROM `Order` WHERE id = (?)',
      [id],
    );

    return rows[0];
  }

  public async getLatestOrderIdByUserId(userId: string): Promise<number> {
    const [rows] = await this.connection.query(
      'SELECT id FROM `Order` WHERE userId = ? ORDER BY id DESC',
      [userId],
    );
    return rows[0].id;
  }

  public async updateOrderById(id: number, userId: string) {
    await this.connection.query('UPDATE `Order` SET userId = ? WHERE id = ?', [
      userId,
      id,
    ]);
  }

  public async deleteOrderById(id: number) {
    await this.connection.query('DELETE FROM `Order` WHERE id = (?)', [id]);
  }
}
