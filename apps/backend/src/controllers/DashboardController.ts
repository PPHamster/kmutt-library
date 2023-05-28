import { DashboardService } from '@/services/DashboardService';
import { AdminGuard } from '@/utils/guards/AdminGuard';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('dashboard')
export class DashboardController {
  public constructor(private readonly dashboardService: DashboardService) {}

  @Get('orders')
  @UseGuards(AuthGuard, AdminGuard)
  public async getAllOrderByDate(@Res() res: Response) {
    const orders = await this.dashboardService.getAllOrderByDate();
    return res.status(HttpStatus.OK).json(orders);
  }

  @Get('orders/hour-count')
  @UseGuards(AuthGuard, AdminGuard)
  public async getAllOrderWithCountWithHourByDate(@Res() res: Response) {
    const orders =
      await this.dashboardService.getAllOrderWithCountWithHourByDate();
    return res.status(HttpStatus.OK).json(orders);
  }

  @Get('orders/latest')
  @UseGuards(AuthGuard, AdminGuard)
  public async getLatestOrderByCount(
    @Res() res: Response,
    @Query('count') count: number,
  ) {
    const orders = await this.dashboardService.getLatestOrderByCount(count);
    return res.status(HttpStatus.OK).json(orders);
  }

  @Get('books')
  @UseGuards(AuthGuard, AdminGuard)
  public async getBooksWithCount(
    @Res() res: Response,
    @Query('count') count: number,
  ) {
    const books = await this.dashboardService.getBooksWithCount(count);
    return res.status(HttpStatus.OK).json(books);
  }

  @Get('books/latest')
  @UseGuards(AuthGuard, AdminGuard)
  public async getLatestBooks(
    @Res() res: Response,
    @Query('count') count: number,
  ) {
    const books = await this.dashboardService.getLatestBooks(count);
    return res.status(HttpStatus.OK).json(books);
  }

  @Get('blogs')
  @UseGuards(AuthGuard, AdminGuard)
  public async getAllBlogs(@Res() res: Response) {
    const blogs = await this.dashboardService.getAllBlogs();
    return res.status(HttpStatus.OK).json(blogs);
  }

  @Get('blogs/:count')
  @UseGuards(AuthGuard, AdminGuard)
  public async getBlogsWithCount(
    @Res() res: Response,
    @Param('count') count: number,
  ) {
    const blogs = await this.dashboardService.getBlogsWithCount(count);
    return res.status(HttpStatus.OK).json(blogs);
  }

  @Get('events')
  @UseGuards(AuthGuard, AdminGuard)
  public async getAllEvent(@Res() res: Response) {
    const events = await this.dashboardService.getAllEvent();
    return res.status(HttpStatus.OK).json(events);
  }

  @Get('events/latest')
  @UseGuards(AuthGuard, AdminGuard)
  public async getLatestEvent(
    @Res() res: Response,
    @Query('count') count: number,
  ) {
    const events = await this.dashboardService.getLatestEvent(count);
    return res.status(HttpStatus.OK).json(events);
  }

  @Get('events/:count')
  @UseGuards(AuthGuard, AdminGuard)
  public async getEventsWithCount(
    @Res() res: Response,
    @Param('count') count: number,
  ) {
    const events = await this.dashboardService.getEventsWithCount(count);
    return res.status(HttpStatus.OK).json(events);
  }

  @Get('rooms/:count')
  @UseGuards(AuthGuard, AdminGuard)
  public async getRoomsWithCount(
    @Res() res: Response,
    @Param('count') count: number,
  ) {
    const rooms = await this.dashboardService.getRoomsWithCount(count);
    return res.status(HttpStatus.OK).json(rooms);
  }
}
