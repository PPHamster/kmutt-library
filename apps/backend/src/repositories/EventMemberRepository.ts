import { Inject, Injectable } from '@nestjs/common';
import { EventMember, User } from 'api-schema';
import { Connection } from 'mysql2/promise';
@Injectable()
export class EventMemberRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async createEventMember(eventId: number, userId: string) {
    await this.connection.query('INSERT INTO EventMember VALUES (?, ?)', [
      eventId,
      userId,
    ]);
  }

  public async getMemberById(
    eventId: number,
    userId: string,
  ): Promise<EventMember> {
    const [rows] = await this.connection.query(
      'SELECT * FROM EventMember WHERE eventId = ? AND userId = ?',
      [eventId, userId],
    );

    return rows[0];
  }

  public async getAllMemberByEventId(eventId: number): Promise<EventMember[]> {
    const [rows] = await this.connection.query(
      'SELECT * FROM EventMember WHERE eventId = ?',
      [eventId],
    );

    return rows as any[] as EventMember[];
  }

  public async getAllUserByEventId(eventId: number): Promise<User[]> {
    const [rows] = await this.connection.query(
      `
      SELECT u.id, u.email, u.tel, u.firstname, u.lastname, u.image,
      u.isBlacklist, u.registYear, r.name AS role, b.name AS branch FROM EventMember AS em
      INNER JOIN User AS u ON em.userId = u.id AND !u.isBlacklist
      INNER JOIN Role AS r ON u.roleId = r.id
      INNER JOIN Branch AS b ON u.branchId = b.id
      WHERE em.eventId = ?
      `,
      [eventId],
    );

    return rows as any[] as User[];
  }

  public async deleteEventMemberById(eventId: number, userId: string) {
    await this.connection.query(
      'DELETE FROM EventMember WHERE eventId = ? AND userId = ?',
      [eventId, userId],
    );
  }
}
