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

  public async getBooksWithCount(count: number) {
    const [rows] = await this.connection.query(
      `
      SELECT b.title, COUNT(*) AS \`count\` FROM Book AS b
      INNER JOIN OrderItem AS oi ON b.id = oi.bookId
      GROUP BY b.id
      ORDER BY \`count\` DESC
      LIMIT ?
      `,
      [count],
    );

    return rows;
  }

  public async getLatestBooks(count: number) {
    const [rows] = await this.connection.query(
      `
      SELECT * FROM Book
      ORDER BY id DESC
      LIMIT ?
      `,
      [count],
    );

    return rows;
  }

  public async getAllBlogs() {
    const [rows] = await this.connection.query('SELECT * FROM Blog');

    return rows;
  }

  public async getBlogsWithCount(count: number) {
    const [rows] = await this.connection.query(
      `
      SELECT b.title, COUNT(*) AS \`count\` FROM Blog AS bl
      INNER JOIN Book AS b ON bl.bookId = b.id
      GROUP BY b.id
      ORDER BY \`count\` DESC
      LIMIT ?
      `,
      [count],
    );

    return rows;
  }

  public async getAllEvent() {
    const [rows] = await this.connection.query('SELECT * FROM Event');

    return rows;
  }

  public async getLatestEvent(count: number) {
    const [rows] = await this.connection.query(
      `
      SELECT * FROM Event
      ORDER BY id DESC
      LIMIT ?
      `,
      [count],
    );

    return rows;
  }

  public async getEventsWithCount(count: number) {
    const [rows] = await this.connection.query(
      `
      SELECT e.name, COUNT(*) AS \`count\` FROM Event AS e
      INNER JOIN EventMember AS em ON em.eventId = e.id
      GROUP BY e.id
      ORDER BY \`count\` DESC
      LIMIT ?
      `,
      [count],
    );

    return rows;
  }

  public async getRoomsWithCount(count: number) {
    const [rows] = await this.connection.query(
      `
      SELECT r.name, COUNT(*) AS \`count\` FROM Room AS r
      INNER JOIN RoomTimePeriod AS rtp ON r.id = rtp.roomId
      INNER JOIN BookingRoom AS br ON rtp.id = br.roomTimePeriodId
      GROUP BY r.id
      ORDER BY \`count\` DESC
      `,
      [count],
    );

    return rows;
  }
}
