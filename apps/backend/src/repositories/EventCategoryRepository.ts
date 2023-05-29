import {
  EventCategoryCreateDto,
  EventCategoryUpdateDto,
} from '@/utils/dtos/EventCategoryDto';
import { Inject, Injectable } from '@nestjs/common';
import { EventCategory } from 'api-schema';
import { Connection } from 'mysql2/promise';
@Injectable()
export class EventCategoryRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async createEventCategory(data: EventCategoryCreateDto) {
    await this.connection.query(
      `
      INSERT INTO EventCategory (name)
      SELECT ? WHERE NOT EXISTS
      (SELECT * FROM EventCategory WHERE name = ?)
      `,
      [data.name, data.name],
    );
  }

  public async createManyEventCategories(query: string, values: string[]) {
    await this.connection.query(
      `INSERT IGNORE INTO EventCategory (name) VALUES ${query}`,
      values,
    );
  }

  public async createEventEventCategory(query: string, values: any[]) {
    await this.connection.query(
      `INSERT IGNORE INTO EventEventCategory VALUES ${query}`,
      values,
    );
  }

  public async getAllEventCategory(): Promise<EventCategory[]> {
    const [rows] = await this.connection.query('SELECT * FROM EventCategory');
    return rows as any[] as EventCategory[];
  }

  public async getEventCategoryById(id: number): Promise<EventCategory> {
    const [rows] = await this.connection.query(
      'SELECT * FROM EventCategory WHERE id = ?',
      [id],
    );

    return rows[0];
  }

  public async getAllEventCategoryByEventId(
    eventId: number,
  ): Promise<EventCategory[]> {
    const [rows] = await this.connection.query(
      `
      SELECT ec.* FROM Event AS e
      LEFT JOIN EventEventCategory AS eec ON e.id = eec.eventId
      LEFT JOIN EventCategory AS ec ON eec.eventCategoryId = ec.id
      WHERE e.id = ?
      `,
      [eventId],
    );

    return rows as any[] as EventCategory[];
  }

  public async getAllEventCategoryNotInEventById(
    eventId: number,
  ): Promise<EventCategory[]> {
    const [rows] = await this.connection.query(
      `
      SELECT * FROM EventCategory WHERE id NOT IN
      (SELECT eec.eventCategoryId FROM Event AS e
      LEFT JOIN EventEventCategory AS eec ON e.id = eec.eventId
      WHERE e.id = ?)
      ORDER BY id
      `,
      [eventId],
    );

    return rows as any[] as EventCategory[];
  }

  public async updateEventCategoryById(
    id: number,
    data: EventCategoryUpdateDto,
  ) {
    await this.connection.query(
      'UPDATE EventCategory SET name = ? WHERE id = ?',
      [data.name, id],
    );
  }

  public async deleteAllCategoryFromEventById(eventId: number) {
    await this.connection.query(
      'DELETE FROM EventEventCategory WHERE eventId = ?',
      [eventId],
    );
  }

  public async deleteEventCategoryById(id: number) {
    await this.connection.query('DELETE FROM EventCategory WHERE id = ?', [id]);
  }
}
