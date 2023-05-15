import { BlogCreateDto } from '@/utils/dtos/BlogDto';
import { Inject, Injectable } from '@nestjs/common';
import { Blog } from 'api-schema';
import { Connection } from 'mysql2/promise';
@Injectable()
export class BlogRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async createBlog(data: BlogCreateDto, userId: string, bookId: number) {
    await this.connection.query(
      'INSERT INTO Blog (article, userId, bookId) VALUES (?, ?, ?)',
      [data.article, userId, bookId],
    );
  }

  public async getBlogById(id: number): Promise<Blog> {
    const [rows] = await this.connection.query(
      'SELECT * FROM Blog WHERE id = ?',
      [id],
    );
    return rows[0];
  }

  public async getLatestBlogByUserId(userId: string): Promise<Blog> {
    const [rows] = await this.connection.query(
      'SELECT * FROM Blog WHERE userId = ? ORDER BY id DESC',
      [userId],
    );

    return rows[0];
  }

  public async getBlogByUserIdAndBookId(
    userId: string,
    bookId: number,
  ): Promise<Blog> {
    const [rows] = await this.connection.query(
      'SELECT * FROM Blog WHERE userId = ? AND bookId = ?',
      [userId, bookId],
    );
    return rows[0];
  }

  public async getAllBlogByTag(tag: string): Promise<Blog[]> {
    const [rows] = await this.connection.query(
      `
      SELECT b.* FROM Blog AS b
      INNER JOIN BlogTag AS bt ON b.id = bt.blogId
      INNER JOIN Tag AS t ON t.id = bt.tagId AND t.name = ?
      `,
      [tag],
    );

    return rows as any[] as Blog[];
  }

  public async getAllBlog(): Promise<Blog[]> {
    const [rows] = await this.connection.query('SELECT * FROM Blog');
    return rows as any[] as Blog[];
  }

  public async getAllBlogByUserId(userId: string): Promise<Blog[]> {
    const [rows] = await this.connection.query(
      'SELECT * FROM Blog WHERE userId = ?',
      [userId],
    );
    return rows as any[] as Blog[];
  }

  public async getBlogWithTagById(blogId: number, tagId: number) {
    const [rows] = await this.connection.query(
      `
      SELECT * FROM Blog AS b
      INNER JOIN BlogTag AS bt ON b.id = bt.blogId
      INNER JOIN Tag AS t ON t.id = bt.tagId AND t.id = ?
      WHERE b.id = ?
      `,
      [tagId, blogId],
    );

    return rows[0];
  }

  public async updateBlogById(option: string, values: any[], id: number) {
    await this.connection.query(`UPDATE Blog SET ${option} WHERE id = ?`, [
      ...values,
      id,
    ]);
  }

  public async deleteBlogById(id: number) {
    await this.connection.query('DELETE FROM Blog WHERE id = ?', [id]);
  }

  public async deleteTagFromBlogById(blogId: number, tagId: number) {
    await this.connection.query(
      'DELETE FROM BlogTag WHERE blogId = ? AND tagId = ?',
      [blogId, tagId],
    );
  }
}
