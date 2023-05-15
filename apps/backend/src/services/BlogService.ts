import { BadRequestException, Injectable } from '@nestjs/common';
import {
  BlogAddTagDto,
  BlogCreateDto,
  BlogUpdateDto,
} from '@/utils/dtos/BlogDto';
import { BlogRepository } from '@/repositories/BlogRepository';
import { TagRepository } from '@/repositories/TagRepository';
import { BookRepository } from '@/repositories/BookRepository';
import { BlogWithTags } from 'api-schema';

@Injectable()
export class BlogService {
  public constructor(
    private readonly blogRepository: BlogRepository,
    private readonly tagRepository: TagRepository,
    private readonly bookRepository: BookRepository,
  ) {}

  public async createBlog(data: BlogCreateDto, userId: string, bookId: number) {
    const booksCanCreteBlog =
      await this.bookRepository.getAllBookNotCreatedBlogByUserId(userId);

    const canCreate = booksCanCreteBlog
      .map((book) => book.id)
      .some((id) => id === bookId);

    if (!canCreate) {
      throw new BadRequestException("Can't create blog from this book");
    }

    await this.blogRepository.createBlog(data, userId, bookId);

    const latestBlog = await this.blogRepository.getLatestBlogByUserId(userId);

    const tags = await this.tagRepository.getAllTag();

    const tagsName = tags.map((tag) => tag.name);

    const blogValues: string[] = [];
    const blogQuery = data.tags
      .filter((tag) => {
        return !tagsName.includes(tag);
      })
      .map((tag) => {
        blogValues.push(tag);
        return '(?)';
      })
      .join(', ');

    if (blogValues.length > 0) {
      await this.tagRepository.createManyTags(blogQuery, blogValues);
    }

    const tagValues: any[] = [];
    const tagQuery = data.tags
      .map((tag) => {
        tagValues.push(latestBlog.id, tag);
        return `(?, (SELECT id FROM Tag WHERE name = ?))`;
      })
      .join(', ');

    await this.tagRepository.createBlogTag(tagQuery, tagValues);
  }

  public async addTagById(blogId: number, data: BlogAddTagDto) {
    await this.tagRepository.createTag(data);

    await this.tagRepository.createBlogTag(
      '(?, (SELECT id FROM Tag WHERE name = ?))',
      [blogId, data.name],
    );
  }

  public async getBlogById(id: number) {
    return this.blogRepository.getBlogById(id);
  }

  public async getBlogWithTagById(blogId: number, tagId: number) {
    return this.blogRepository.getBlogWithTagById(blogId, tagId);
  }

  public async getBlogWithTagsById(id: number): Promise<BlogWithTags> {
    const blog = await this.blogRepository.getBlogById(id);
    const tags = await this.tagRepository.getAllTagByBlogId(id);

    const book = await this.bookRepository.getBookById(blog.bookId);

    delete blog.bookId;

    const blogWithTags = {
      ...blog,
      tags,
      book,
    };

    return blogWithTags;
  }

  public async getAllBlogByTag(tag: string): Promise<BlogWithTags[]> {
    const blogs = await this.blogRepository.getAllBlogByTag(tag);
    const blogsWithTags: BlogWithTags[] = [];

    for (const blog of blogs) {
      const tags = await this.tagRepository.getAllTagByBlogId(blog.id);
      const book = await this.bookRepository.getBookById(blog.bookId);

      delete blog.bookId;

      blogsWithTags.push({
        ...blog,
        tags,
        book,
      });
    }

    return blogsWithTags;
  }

  public async getAllBlog(): Promise<BlogWithTags[]> {
    const blogs = await this.blogRepository.getAllBlog();
    const blogsWithTags: BlogWithTags[] = [];

    for (const blog of blogs) {
      const tags = await this.tagRepository.getAllTagByBlogId(blog.id);
      const book = await this.bookRepository.getBookById(blog.bookId);

      delete blog.bookId;

      blogsWithTags.push({
        ...blog,
        tags,
        book,
      });
    }

    return blogsWithTags;
  }

  public async getAllBlogByUserId(userId: string): Promise<BlogWithTags[]> {
    const blogs = await this.blogRepository.getAllBlogByUserId(userId);
    const blogsWithTags: BlogWithTags[] = [];

    for (const blog of blogs) {
      const tags = await this.tagRepository.getAllTagByBlogId(blog.id);
      const book = await this.bookRepository.getBookById(blog.bookId);

      delete blog.bookId;

      blogsWithTags.push({
        ...blog,
        tags,
        book,
      });
    }

    return blogsWithTags;
  }

  public async updateBlogById(id: number, data: BlogUpdateDto) {
    if (Object.keys(data).length === 0)
      throw new BadRequestException('No data that want to update');

    const values = [];
    const updateQuery = Object.keys(data)
      .map((key) => {
        values.push(data[key]);
        return `${key} = ?`;
      })
      .join(', ');

    await this.blogRepository.updateBlogById(updateQuery, values, id);
  }

  public async deleteBlogById(id: number) {
    return this.blogRepository.deleteBlogById(id);
  }

  public async deleteTagFromBlogById(blogId: number, tagId: number) {
    return this.blogRepository.deleteTagFromBlogById(blogId, tagId);
  }
}
