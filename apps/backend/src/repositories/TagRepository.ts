import { TagCreateDto, TagUpdateDto } from '@/utils/dtos/TagDto';
import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
@Injectable()
export class TagRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async createTag(data: TagCreateDto) {
    await this.connection.query('INSERT IGNORE INTO Tag (name) VALUES (?)', [
      data.name,
    ]);
  }

  public async createManyTags(query: string, values: string[]) {
    await this.connection.query(
      `INSERT IGNORE INTO Tag (name) VALUES ${query}`,
      values,
    );
  }

  public async createBlogTag(query: string, values: any[]) {
    await this.connection.query(
      `INSERT IGNORE INTO BlogTag VALUES ${query}`,
      values,
    );
  }

  public async getTagById(id: number) {
    const [rows] = await this.connection.query(
      'SELECT * FROM Tag WHERE id = ?',
      [id],
    );
    return rows[0];
  }

  public async getAllTag() {
    const [rows] = await this.connection.query('SELECT * FROM Tag');
    return rows;
  }

  public async getAllTagByBlogId(blogId: number) {
    const [rows] = await this.connection.query(
      `
      SELECT t.* FROM Tag AS t
      LEFT JOIN BlogTag AS bt ON t.id = bt.tagId
      LEFT JOIN Blog AS b ON b.id = bt.blogId
      WHERE b.id = ?
      `,
      [blogId],
    );

    return rows as any[];
  }

  public async updateTagById(id: number, data: TagUpdateDto) {
    await this.connection.query('UPDATE Tag SET name = ? WHERE id = ?', [
      data.name,
      id,
    ]);
  }

  public async deleteTagById(id: number) {
    await this.connection.query('DELETE FROM Tag WHERE id = ?', [id]);
  }
}
