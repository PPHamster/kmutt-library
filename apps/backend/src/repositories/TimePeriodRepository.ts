import { TimePeriodCreateDto } from '@/utils/dtos/TimePeriodDto';
import { Inject, Injectable } from '@nestjs/common';
import { TimePeriod } from 'api-schema';
import { Connection } from 'mysql2/promise';

@Injectable()
export class TimePeriodRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async createTimePeriod(data: TimePeriodCreateDto) {
    await this.connection.query(
      `
      INSERT INTO TimePeriod (beginTime, endTime)
      SELECT ?, ? WHERE NOT EXISTS
      ( SELECT * FROM TimePeriod WHERE beginTime = ? AND endTime = ? )
      `,
      [data.beginTime, data.endTime, data.beginTime, data.endTime],
    );
  }

  public async createManyTimePeriod(query: string, values: string[]) {
    await this.connection.query(
      `INSERT IGNORE INTO TimePeriod (beginTime, endTime) VALUES ${query}`,
      values,
    );
  }

  public async createRoomTimePeriod(
    roomId: number,
    timePeriod: TimePeriodCreateDto,
  ) {
    await this.connection.query(
      `
      INSERT INTO RoomTimePeriod (roomId, timePeriodId)
      SELECT ?,
      (SELECT id FROM TimePeriod WHERE beginTime = ? AND endTime = ?)
      WHERE NOT EXISTS
      ( SELECT * FROM RoomTimePeriod WHERE roomId = ?
        AND timePeriodId = (SELECT id FROM TimePeriod WHERE beginTime = ? AND endTime = ?) )
      `,
      [
        roomId,
        timePeriod.beginTime,
        timePeriod.endTime,
        roomId,
        timePeriod.beginTime,
        timePeriod.endTime,
      ],
    );
  }

  public async createManyRoomTimePeriod(
    query: string,
    values: (string | number)[],
  ) {
    await this.connection.query(
      `INSERT IGNORE INTO RoomTimePeriod (roomId, timePeriodId) VALUES ${query}`,
      values,
    );
  }

  public async getTimePeriodById(id: number): Promise<TimePeriod> {
    const [rows] = await this.connection.query(
      'SELECT * FROM TimePeriod WHERE id = ?',
      [id],
    );
    return rows[0];
  }

  public async getAllTimePeriod(): Promise<TimePeriod[]> {
    const [rows] = await this.connection.query('SELECT * FROM TimePeriod');
    return rows as any[] as TimePeriod[];
  }

  public async getAllTimePeriodByRoomId(roomId: number): Promise<TimePeriod[]> {
    const [rows] = await this.connection.query(
      `
      SELECT tp.* FROM Room AS r
      INNER JOIN RoomTimePeriod AS rtp ON r.id = rtp.roomId
      INNER JOIN TimePeriod AS tp ON rtp.timePeriodId = tp.id
      WHERE r.id = ?
      `,
      [roomId],
    );

    return rows as any[] as TimePeriod[];
  }

  public async updateTimePeriodById(
    option: string,
    value: string[],
    id: number,
  ) {
    const [rows] = await this.connection.query(
      `UPDATE TimePeriod SET ${option} WHERE id = ?`,
      [...value, id],
    );
    return rows;
  }

  public async deleteTimePeriodById(id: number) {
    await this.connection.query('DELETE FROM TimePeriod WHERE id = ?', [id]);
  }
}
