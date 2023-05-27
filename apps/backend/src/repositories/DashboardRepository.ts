import { Inject, Injectable } from '@nestjs/common';
import { Order } from 'api-schema';
import { Connection } from 'mysql2/promise';
@Injectable()
export class DashboardRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async getAllOrderByDate(): Promise<Order[]> {
    const [rows] = await this.connection.query(
      'SELECT * FROM `Order` WHERE DATE(createdAt) = DATE(CURRENT_TIMESTAMP)',
    );

    return rows as any[] as Order[];
  }

  public async getAllOrderWithCountWithHourByDate() {
    const [rows] = await this.connection.query(
      `
      SELECT HOUR(o.createdAt) AS \`hour\`,
      COUNT(*) AS \`count\` FROM \`Order\` AS o
      INNER JOIN OrderItem AS oi ON o.id = oi.orderId
      WHERE DATE(o.createdAt) = DATE(CURRENT_TIMESTAMP)
      GROUP BY HOUR(o.createdAt)
      ORDER BY HOUR(o.createdAt)
      `,
    );

    return rows;
  }

  public async getLatestOrderByCount(count: number) {
    const [rows] = await this.connection.query(
      `
      SELECT o.id, o.createdAt, u.id AS userId,
      u.firstname, u.lastname, COUNT(o.id) AS \`count\` FROM \`Order\` AS o
      INNER JOIN OrderItem AS oi ON o.id = oi.orderId
      INNER JOIN User AS u ON o.userId = u.id
      GROUP BY o.id
      ORDER BY o.id DESC
      LIMIT ?
      `,
      [count],
    );

    return rows;
  }
}
