import { EventService } from '@/services/EventService';
import { RequestUser } from '@/utils/decorators/AuthDecorator';
import {
  EventAddCategoryDto,
  EventCreateDto,
  EventUpdateDto,
  EventUpdateImageDto,
} from '@/utils/dtos/EventDto';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import { EventGuard } from '@/utils/guards/EventGuard';
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
import { User } from 'api-schema';
import { Response } from 'express';

@Controller('events')
export class EventController {
  public constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(AuthGuard, StaffGuard)
  public async createEvent(@Body() body: EventCreateDto, @Res() res: Response) {
    await this.eventService.createEvent(body);
    return res
      .status(HttpStatus.CREATED)
      .json({ msg: `Create event name ${body.name} successfully` });
  }

  @Post(':id/join')
  @UseGuards(AuthGuard, EventGuard)
  public async joinEventById(
    @RequestUser() user: User,
    @Query('userId') userId: string,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    userId
      ? await this.eventService.addMemberById(id, userId)
      : await this.eventService.addMemberById(id, user.id);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Join event id ${id} successfully` });
  }

  @Post(':id/category')
  @UseGuards(AuthGuard, StaffGuard, EventGuard)
  public async addEventCategoryById(
    @Param('id') id: number,
    @Body() body: EventAddCategoryDto,
    @Res() res: Response,
  ) {
    await this.eventService.addCategoryById(id, body);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Add ${body.name} to event id ${id} successfully` });
  }

  @Get()
  public async getAllEvent(@Res() res: Response) {
    const events = await this.eventService.getAllEvent();
    return res.status(HttpStatus.OK).json(events);
  }

  @Get(':id')
  @UseGuards(EventGuard)
  public async getEventById(@Param('id') id: number, @Res() res: Response) {
    const event = await this.eventService.getEventWithCategoriesById(id);
    return res.status(HttpStatus.OK).json(event);
  }

  @Get(':id/member')
  @UseGuards(EventGuard)
  public async getAllUserByEventId(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    const users = await this.eventService.getAllUserByEventId(id);
    return res.status(HttpStatus.OK).json(users);
  }

  @Put(':id')
  @UseGuards(AuthGuard, StaffGuard, EventGuard)
  public async updateEventById(
    @Param('id') id: number,
    @Body() body: EventUpdateDto,
    @Res() res: Response,
  ) {
    await this.eventService.updateEventById(id, body);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Update event id ${id} successfully` });
  }

  @Put(':id/image')
  @UseGuards(AuthGuard, StaffGuard, EventGuard)
  public async updateEventImageById(
    @Param('id') id: number,
    @Body() body: EventUpdateImageDto,
    @Res() res: Response,
  ) {
    await this.eventService.updateEventImageById(id, body);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Update event image id ${id} successfully` });
  }

  @Delete(':id')
  @UseGuards(AuthGuard, StaffGuard, EventGuard)
  public async deleteEventById(@Param('id') id: number, @Res() res: Response) {
    await this.eventService.deleteEventById(id);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Delete event id ${id} successfully` });
  }

  @Delete(':id/join')
  @UseGuards(AuthGuard, EventGuard)
  public async leaveEventById(
    @RequestUser() user: User,
    @Query('userId') userId: string,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    userId
      ? await this.eventService.deleteMemberFromEventById(id, userId)
      : await this.eventService.deleteMemberFromEventById(id, user.id);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Leave from event id ${id} successfully` });
  }

  @Delete(':id/category/:eventCategoryId')
  @UseGuards(AuthGuard, StaffGuard, EventGuard)
  public async deleteCategoryFromEventById(
    @Param('id') eventId: number,
    @Param('eventCategoryId') categoryId: number,
    @Res() res: Response,
  ) {
    await this.eventService.deleteCategoryFromEventById(eventId, categoryId);
    return res.status(HttpStatus.OK).json({
      msg: `Delete category id ${categoryId} from event id ${eventId} successfully`,
    });
  }
}
