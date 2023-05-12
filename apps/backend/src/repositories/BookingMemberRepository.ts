import { Inject, Injectable } from '@nestjs/common';
import { User } from 'api-schema';
import { Connection } from 'mysql2/promise';

@Injectable()
export class BookingMemberRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async createBookingMember(query: string, values: (number | string)[]) {
    await this.connection.query(
      `
      INSERT INTO BookingMember
      VALUES ${query}
      `,
      values,
    );
  }

  public async getAllMemberByBookingRoomId(
    bookingRoomId: number,
  ): Promise<User[]> {
    const [rows] = await this.connection.query(
      `
      SELECT u.id, u.email, u.tel, u.firstname, u.lastname, u.image,
      u.isBlacklist, u.registYear, r.name AS role, b.name AS branch
      FROM BookingMember AS bm
      INNER JOIN User AS u ON bm.userId = u.id
      LEFT JOIN Role AS r ON u.roleId = r.id
      LEFT JOIN Branch AS b ON u.branchId = b.id
      WHERE bm.bookingRoomId = ?
      `,
      [bookingRoomId],
    );

    return rows as any[] as User[];
  }

  public async getOneMemberByUserIdAndBookingRoomId(
    userId: string,
    bookingRoomId: number,
  ): Promise<User> {
    const [rows] = await this.connection.query(
      `
      SELECT u.id, u.email, u.tel, u.firstname, u.lastname, u.image,
      u.isBlacklist, u.registYear, r.name AS role, b.name AS branch
      FROM BookingMember AS bm
      INNER JOIN User AS u ON bm.userId = u.id AND u.id = ?
      LEFT JOIN Role AS r ON u.roleId = r.id
      LEFT JOIN Branch AS b ON u.branchId = b.id
      WHERE bm.bookingRoomId = ?
      `,
      [userId, bookingRoomId],
    );

    return rows[0];
  }

  public async deleteBookingMemberByBookingRoomId(bookingRoomId: number) {
    await this.connection.query(
      'DELETE FROM BookingMember WHERE bookingRoomId = ?',
      [bookingRoomId],
    );
  }
}
