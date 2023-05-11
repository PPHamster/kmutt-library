import { EventCategoryService } from '@/services/EventCategoryService';
import {
  EventCategoryCreateDto,
  EventCategoryUpdateDto,
} from '@/utils/dtos/EventCategoryDto';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import { EventCategoryGuard } from '@/utils/guards/EventCategoryGuard';
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

@Controller('event-categories')
export class EventCategoryController {
  public constructor(
    private readonly eventCategoryService: EventCategoryService,
  ) {}

  @Post()
  @UseGuards(AuthGuard, StaffGuard)
  public async createNewEventCategory(
    @Body() body: EventCategoryCreateDto,
    @Res() res: Response,
  ) {
    await this.eventCategoryService.createEventCategory(body);
    return res
      .status(HttpStatus.CREATED)
      .json({ msg: `Create event category ${body.name} successfully` });
  }

  @Get()
  public async getAllEventCategory(@Res() res: Response) {
    const eventCategories =
      await this.eventCategoryService.getAllEventCategory();

    return res.status(HttpStatus.OK).json(eventCategories);
  }

  @Get(':id')
  @UseGuards(AuthGuard, StaffGuard, EventCategoryGuard)
  public async getEventCategoryById(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    const eventCategory = await this.eventCategoryService.getEventCategoryById(
      id,
    );

    return res.status(HttpStatus.OK).json(eventCategory);
  }

  @Put(':id')
  @UseGuards(AuthGuard, StaffGuard, EventCategoryGuard)
  public async updateEventCategoryById(
    @Param('id') id: number,
    @Body() body: EventCategoryUpdateDto,
    @Res() res: Response,
  ) {
    await this.eventCategoryService.updateEventCategoryById(id, body);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Update event category id ${id} successfully` });
  }

  @Delete(':id')
  @UseGuards(AuthGuard, StaffGuard, EventCategoryGuard)
  public async deleteEventCategoryById(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    await this.eventCategoryService.deleteEventCategoryById(id);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Delete event category id ${id} successfully` });
  }
}
