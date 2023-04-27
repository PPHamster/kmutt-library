import { BadRequestException, Injectable } from '@nestjs/common';
import {
  BlogAddTagDto,
  BlogCreateDto,
  BlogUpdateDto,
} from '@/utils/dtos/BlogDto';
import { BlogRepository } from '@/repositories/BlogRepository';
import { TagRepository } from '@/repositories/TagRepository';

@Injectable()
export class BlogService {
  public constructor(
    private readonly blogRepository: BlogRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  public async createBlog(data: BlogCreateDto, userId: string, bookId: number) {
    if (await this.blogRepository.getBlogByUserIdAndBookId(userId, bookId)) {
      throw new BadRequestException(
        'You have already written a blog for this book.',
      );
    }
    await this.blogRepository.createBlog(data, userId, bookId);

    const latestBlog = await this.blogRepository.getLatestBlogByUserId(userId);

    const blogValues: string[] = [];
    const blogQuery = data.tags
      .map((tag) => {
        blogValues.push(tag);
        return '(?)';
      })
      .join(', ');

    await this.tagRepository.createManyTags(blogQuery, blogValues);

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

  public async getBlogWithTagsById(id: number) {
    const blog = await this.blogRepository.getBlogById(id);
    const tags = await this.tagRepository.getAllTagByBlogId(id);

    const blogWithTags = {
      ...blog,
      tags,
    };

    return blogWithTags;
  }

  public async getAllBlogByTag(tag: string) {
    const blogs = await this.blogRepository.getAllBlogByTag(tag);
    const blogsWithTags = [];

    for (const blog of blogs) {
      const tags = await this.tagRepository.getAllTagByBlogId(blog.id);

      blogsWithTags.push({
        ...blog,
        tags,
      });
    }

    return blogsWithTags;
  }

  public async getAllBlog() {
    const blogs = await this.blogRepository.getAllBlog();
    const blogsWithTags = [];

    for (const blog of blogs) {
      const tags = await this.tagRepository.getAllTagByBlogId(blog.id);

      blogsWithTags.push({
        ...blog,
        tags,
      });
    }

    return blogsWithTags;
  }

  public async getAllBlogByUserId(userId: string) {
    const blogs = await this.blogRepository.getAllBlogByUserId(userId);
    const blogsWithTags = [];

    for (const blog of blogs) {
      const tags = await this.tagRepository.getAllTagByBlogId(blog.id);

      blogsWithTags.push({
        ...blog,
        tags,
      });
    }

    return blogsWithTags;
  }

  public async updateBlogById(id: number, data: BlogUpdateDto) {
    return this.blogRepository.updateBlogById(id, data);
  }

  public async deleteBlogById(id: number) {
    return this.blogRepository.deleteBlogById(id);
  }

  public async deleteTagFromBlogById(blogId: number, tagId: number) {
    return this.blogRepository.deleteTagFromBlogById(blogId, tagId);
  }
}
