import { EventCreateDto, EventUpdateImageDto } from '@/utils/dtos/EventDto';
import { Inject, Injectable } from '@nestjs/common';
import { Event } from 'api-schema';
import { Connection } from 'mysql2/promise';
@Injectable()
export class EventRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async createEvent(data: EventCreateDto) {
    await this.connection.query(
      `
      INSERT INTO Event
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        0,
        data.name,
        data.location,
        data.meetingTime,
        data.endTime,
        data.image,
        data.description,
      ],
    );
  }

  public async getAllEvent(): Promise<Event[]> {
    const [rows] = await this.connection.query('SELECT * FROM Event');
    return rows as any[] as Event[];
  }

  public async getAllEventByUserId(userId: string): Promise<Event[]> {
    const [rows] = await this.connection.query(
      `
      SELECT e.* FROM Event AS e
      INNER JOIN EventMember AS em ON e.id = em.eventId AND em.userId = ?
      `,
      [userId],
    );

    return rows as any[] as Event[];
  }

  public async getAllEventNotJoinByUserId(userId: string): Promise<Event[]> {
    const [rows] = await this.connection.query(
      `
      SELECT e.* FROM Event AS e
      INNER JOIN EventMember AS em ON e.id = em.eventId AND em.userId != ?
      GROUP BY e.id
      `,
      [userId],
    );

    return rows as any[] as Event[];
  }

  public async getEventById(id: number): Promise<Event> {
    const [rows] = await this.connection.query(
      'SELECT * FROM Event WHERE id = ?',
      [id],
    );

    return rows[0];
  }

  public async getLatestEvent(): Promise<Event> {
    const [rows] = await this.connection.query(
      'SELECT * FROM Event ORDER BY id DESC',
    );

    return rows[0];
  }

  public async getEventWithCategoryById(eventId: number, categoryId: number) {
    const [rows] = await this.connection.query(
      `
      SELECT * FROM Event AS e
      INNER JOIN EventEventCategory AS eec ON e.id = eec.eventId
      INNER JOIN EventCategory AS ec ON ec.id = eec.eventCategoryId AND ec.id = ?
      WHERE e.id = ?
      `,
      [categoryId, eventId],
    );

    return rows[0];
  }

  public async updateEventById(option: string, values: any[], id: number) {
    await this.connection.query(`UPDATE Event SET ${option} WHERE id = ?`, [
      ...values,
      id,
    ]);
  }

  public async updateEventImageById(id: number, data: EventUpdateImageDto) {
    await this.connection.query('UPDATE Event SET image = ? WHERE id = ?', [
      data.image,
      id,
    ]);
  }

  public async deleteEventById(id: number) {
    await this.connection.query('DELETE FROM Event WHERE id = ?', [id]);
  }

  public async deleteCategoryFromEventById(
    eventId: number,
    categoryId: number,
  ) {
    await this.connection.query(
      'DELETE FROM EventEventCategory WHERE eventId = ? AND eventCategoryId = ?',
      [eventId, categoryId],
    );
  }
}
