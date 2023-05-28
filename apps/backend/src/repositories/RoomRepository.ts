import { RoomCreateDto, RoomUpdateImageDto } from '@/utils/dtos/RoomDto';
import { Inject, Injectable } from '@nestjs/common';
import { Room, RoomUserBooking } from 'api-schema';
import { Connection } from 'mysql2/promise';

@Injectable()
export class RoomRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async createRoom(data: RoomCreateDto) {
    await this.connection.query(
      `
      INSERT INTO Room (name, location, image)
      VALUES (?, ?, ?)
      `,
      [data.name, data.location, data.image],
    );
  }

  public async getAllRoom(): Promise<Room[]> {
    const [rows] = await this.connection.query('SELECT * FROM Room');
    return rows as any[] as Room[];
  }

  public async getRoomById(id: number): Promise<Room> {
    const [rows] = await this.connection.query(
      'SELECT * FROM Room WHERE id = ?',
      [id],
    );
    return rows[0];
  }

  public async getLatestRoom(): Promise<Room> {
    const [rows] = await this.connection.query(
      'SELECT * FROM Room ORDER BY id DESC',
    );

    return rows[0];
  }

  public async getRoomWithTimePeriodById(roomId: number, timePeriodId: number) {
    const [rows] = await this.connection.query(
      `
      SELECT * FROM Room AS r
      INNER JOIN RoomTimePeriod AS rtp ON r.id = rtp.roomId
      INNER JOIN TimePeriod AS tp ON tp.id = rtp.timePeriodId AND tp.id = ?
      WHERE r.id = ?
      `,
      [timePeriodId, roomId],
    );

    return rows[0];
  }

  public async getRoomBookingByUserId(
    userId: string,
  ): Promise<RoomUserBooking[]> {
    const [rows] = await this.connection.query(
      `
      SELECT r.*, br.date, tp.id AS timePeriodId, tp.beginTime,
      tp.endTime, br.id AS bookingRoomId FROM BookingMember AS bm
      INNER JOIN BookingRoom AS br ON br.id = bm.bookingRoomId AND bm.userId = ?
      INNER JOIN RoomTimePeriod AS rtp ON rtp.id = br.roomTimePeriodId
      INNER JOIN Room AS r ON r.id = rtp.roomId
      INNER JOIN TimePeriod AS tp ON tp.id = rtp.timePeriodId
      WHERE DATE(br.date) >= DATE(CURRENT_TIMESTAMP)
      `,
      [userId],
    );

    return rows as any[] as RoomUserBooking[];
  }

  public async updateRoomById(option: string, value: any[], id: number) {
    await this.connection.query(`UPDATE Room SET ${option} WHERE id = ?`, [
      ...value,
      id,
    ]);
  }

  public async updateRoomImageById(id: number, data: RoomUpdateImageDto) {
    await this.connection.query('UPDATE Room SET image = ? WHERE id = ?', [
      data.image,
      id,
    ]);
  }

  public async deleteRoomById(id: number) {
    await this.connection.query('DELETE FROM Room WHERE id = ?', [id]);
  }

  public async deleteTimePeriodFromRoomById(
    roomId: number,
    timePeriodId: number,
  ) {
    await this.connection.query(
      'DELETE FROM RoomTimePeriod WHERE roomId = ? AND timePeriodId = ?',
      [roomId, timePeriodId],
    );
  }
}
