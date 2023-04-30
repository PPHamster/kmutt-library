import { CategoryService } from '@/services/CategoryService';
import { CategoryCreateDto, CategoryUpdateDto } from '@/utils/dtos/CategoryDto';
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
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('categories')
export class CategoryController {
  public constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard, StaffGuard)
  public async createNewCategory(
    @Body() body: CategoryCreateDto,
    @Res() res: Response,
  ) {
    await this.categoryService.createCategory(body);
    return res
      .status(HttpStatus.CREATED)
      .json({ msg: `Create category ${body.name} successfully` });
  }

  @Get()
  public async getAllCategory(@Res() res: Response) {
    const categories = await this.categoryService.getAllCategory();
    return res.status(HttpStatus.OK).json(categories);
  }

  @Get(':id')
  @UseGuards(AuthGuard, StaffGuard, CategoryGuard)
  public async getCategoryById(@Param('id') id: number, @Res() res: Response) {
    const category = await this.categoryService.getCategoryById(id);
    return res.status(HttpStatus.OK).json(category);
  }

  @Put(':id')
  @UseGuards(AuthGuard, StaffGuard, CategoryGuard)
  public async updateCategoryCById(
    @Param('id') id: number,
    @Body() body: CategoryUpdateDto,
    @Res() res: Response,
  ) {
    await this.categoryService.updateCategoryById(id, body);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Update category id ${id} successfully` });
  }

  @Delete(':id')
  @UseGuards(AuthGuard, StaffGuard, CategoryGuard)
  public async deleteCategoryById(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    await this.categoryService.deleteCategoryById(id);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Delete category id ${id} successfully` });
  }
}
