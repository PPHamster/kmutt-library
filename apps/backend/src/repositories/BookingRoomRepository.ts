import { BookingRoomCreateDto } from '@/utils/dtos/RoomDto';
import { Inject, Injectable } from '@nestjs/common';
import { BookingRoom } from 'api-schema';
import { Connection } from 'mysql2/promise';

@Injectable()
export class BookingRoomRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async createBookingRoom(
    roomId: number,
    timePeriodId: number,
    data: BookingRoomCreateDto,
  ) {
    await this.connection.query(
      `
      INSERT INTO BookingRoom (date, roomTimePeriodId)
      VALUES (?, (SELECT id FROM RoomTimePeriod WHERE roomId = ? AND timePeriodId = ?))
      `,
      [data.date, roomId, timePeriodId],
    );
  }

  public async getBookingRoomByRoomAndTimePeriodId(
    roomId: number,
    timePeriodId: number,
    date: string,
  ): Promise<BookingRoom> {
    const [rows] = await this.connection.query(
      `
      SELECT br.* FROM BookingRoom AS br
      INNER JOIN RoomTimePeriod AS rtp ON br.roomTimePeriodId = rtp.id
      AND rtp.roomId = ? AND rtp.timePeriodId = ?
      WHERE br.date = ?
      `,
      [roomId, timePeriodId, date],
    );

    return rows[0];
  }

  public async getBookingRoomById(id: number): Promise<BookingRoom> {
    const [rows] = await this.connection.query(
      'SELECT * FROM BookingRoom WHERE id = ?',
      [id],
    );

    return rows[0];
  }

  public async getLatestBookingRoom(): Promise<BookingRoom> {
    const [rows] = await this.connection.query(
      'SELECT * FROM BookingRoom ORDER BY id DESC',
    );

    return rows[0];
  }

  public async deleteBookingRoomById(id: number) {
    await this.connection.query('DELETE FROM BookingRoom WHERE id = ?', [id]);
  }
}
