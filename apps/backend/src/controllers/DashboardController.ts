import { CategoryService } from '@/services/CategoryService';
import { DashboardService } from '@/services/DashboardService';
import { CategoryCreateDto, CategoryUpdateDto } from '@/utils/dtos/CategoryDto';
import { AdminGuard } from '@/utils/guards/AdminGuard';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import { CategoryGuard } from '@/utils/guards/CategoryGuard';
import { StaffGuard } from '@/utils/guards/StaffGuard';
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
}
