import { BlogService } from '@/services/BlogService';
import { RequestUser } from '@/utils/decorators/AuthDecorator';
import {
  BlogAddTagDto,
  BlogCreateDto,
  BlogUpdateDto,
} from '@/utils/dtos/BlogDto';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import { BlogGuard } from '@/utils/guards/BlogGuard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { User } from 'api-schema';
import { Response } from 'express';

@Controller('blogs')
export class BlogController {
  public constructor(private readonly blogService: BlogService) {}

  @Post(':bookId')
  @UseGuards(AuthGuard)
  public async createNewBlog(
    @RequestUser() user: User,
    @Body() body: BlogCreateDto,
    @Param('bookId') bookId: number,
    @Res() res: Response,
  ) {
    await this.blogService.createBlog(body, user.id, bookId);
    return res
      .status(HttpStatus.CREATED)
      .json({ msg: `Create blog for book id ${bookId} successfully` });
  }

  @Get()
  @UseGuards(AuthGuard)
  public async getAllBlog(
    @Query('tag') tag: string | undefined,
    @Res() res: Response,
  ) {
    const blogs = tag
      ? await this.blogService.getAllBlogByTag(tag)
      : await this.blogService.getAllBlog();
    return res.status(HttpStatus.OK).json(blogs);
  }

  @Get(':id')
  @UseGuards(AuthGuard, BlogGuard)
  public async getBlogById(@Param('id') id: number, @Res() res: Response) {
    const blog = await this.blogService.getBlogWithTagsById(id);
    return res.status(HttpStatus.OK).json(blog);
  }

  @Put(':id/tag')
  @UseGuards(AuthGuard, BlogGuard)
  public async addTagById(
    @Param('id') id: number,
    @Body() body: BlogAddTagDto,
    @Res() res: Response,
  ) {
    await this.blogService.addTagById(id, body);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Add ${body.name} to blog id ${id} successfully` });
  }

  @Put(':id')
  @UseGuards(AuthGuard, BlogGuard)
  public async updateBlogById(
    @Param('id') id: number,
    @Body() body: BlogUpdateDto,
    @Res() res: Response,
  ) {
    await this.blogService.updateBlogById(id, body);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Update Blog id ${id} successfully` });
  }

  @Delete(':id')
  @UseGuards(AuthGuard, BlogGuard)
  public async deleteBlogById(@Param('id') id: number, @Res() res: Response) {
    await this.blogService.deleteBlogById(id);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Delete Blog id ${id} successfully` });
  }

  @Delete(':id/tag/:tagId')
  @UseGuards(AuthGuard, BlogGuard)
  public async deleteTagFromBlogById(
    @Param('id') blogId: number,
    @Param('tagId') tagId: number,
    @Res() res: Response,
  ) {
    await this.blogService.deleteTagFromBlogById(blogId, tagId);
    return res.status(HttpStatus.OK).json({
      msg: `Delete tag id ${tagId} from blog id ${blogId} successfully`,
    });
  }
}
