import { RoomService } from '@/services/RoomService';
import { RequestUser } from '@/utils/decorators/AuthDecorator';
import {
  BookingRoomCreateDto,
  RoomCreateDto,
  RoomUpdateDto,
  RoomUpdateImageDto,
} from '@/utils/dtos/RoomDto';
import { TimePeriodCreateDto } from '@/utils/dtos/TimePeriodDto';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import { RoomGuard } from '@/utils/guards/RoomGuard';
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
import { User } from 'api-schema';
import { Response } from 'express';

@Controller('rooms')
export class RoomController {
  public constructor(private readonly roomService: RoomService) {}

  @Post()
  @UseGuards(AuthGuard, StaffGuard)
  public async createRoom(@Body() body: RoomCreateDto, @Res() res: Response) {
    await this.roomService.createRoom(body);
    return res
      .status(HttpStatus.CREATED)
      .json({ msg: `Create room ${body.name} successfully` });
  }

  @Post(':id/time-period')
  @UseGuards(AuthGuard, StaffGuard, RoomGuard)
  public async addTimePeriodById(
    @Param('id') id: number,
    @Body() body: TimePeriodCreateDto,
    @Res() res: Response,
  ) {
    await this.roomService.addTimePeriodById(id, body);
    return res.status(HttpStatus.CREATED).json({
      msg: `Add time period ${body.beginTime} to ${body.endTime} into room id ${id} successfully`,
    });
  }

  @Post(':id/time-period/:timePeriodId/book')
  @UseGuards(AuthGuard, RoomGuard)
  public async bookingRoomById(
    @Param('id') roomId: number,
    @Param('timePeriodId') timePeriodId: number,
    @Body() body: BookingRoomCreateDto,
    @Res() res: Response,
  ) {
    await this.roomService.createBookingRoom(roomId, timePeriodId, body);
    return res.status(HttpStatus.CREATED).json({
      msg: `Booking room id ${roomId} in time period id ${timePeriodId} successfully`,
    });
  }

  @Get()
  public async getAllRoom(@Res() res: Response) {
    const rooms = await this.roomService.getAllRoom();
    return res.status(HttpStatus.OK).json(rooms);
  }

  @Get('interact')
  @UseGuards(AuthGuard)
  public async getRoomBookingByUserId(
    @RequestUser() user: User,
    @Res() res: Response,
  ) {
    const rooms = await this.roomService.getRoomBookingByUserId(user.id);
    return res.status(HttpStatus.OK).json(rooms);
  }

  @Get(':id')
  @UseGuards(RoomGuard)
  public async getRoomById(@Param('id') id: number, @Res() res: Response) {
    const room = await this.roomService.getRoomWithTimePeriodsById(id);
    return res.status(HttpStatus.OK).json(room);
  }

  @Put(':id')
  @UseGuards(AuthGuard, StaffGuard, RoomGuard)
  public async updateRoomById(
    @Param('id') id: number,
    @Body() body: RoomUpdateDto,
    @Res() res: Response,
  ) {
    await this.roomService.updateRoomById(id, body);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Update room id ${id} successfully` });
  }

  @Put(':id/image')
  @UseGuards(AuthGuard, StaffGuard, RoomGuard)
  public async updateRoomImageById(
    @Param('id') id: number,
    @Body() body: RoomUpdateImageDto,
    @Res() res: Response,
  ) {
    await this.roomService.updateRoomImageById(id, body);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Update room image id ${id} successfully` });
  }

  @Delete(':id')
  @UseGuards(AuthGuard, StaffGuard, RoomGuard)
  public async deleteRoomById(@Param('id') id: number, @Res() res: Response) {
    await this.roomService.deleteRoomById(id);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Delete room id ${id} successfully` });
  }

  @Delete(':id/time-period/:timePeriodId')
  @UseGuards(AuthGuard, StaffGuard, RoomGuard)
  public async deleteTimePeriodFromRoomById(
    @Param('id') roomId: number,
    @Param('timePeriodId') timePeriodId: number,
    @Res() res: Response,
  ) {
    await this.roomService.deleteTimePeriodFromRoomById(roomId, timePeriodId);
    return res.status(HttpStatus.OK).json({
      msg: `Delete time period id ${timePeriodId} from room id ${roomId} successfully`,
    });
  }

  @Delete(':id/book/:bookingRoomId')
  @UseGuards(AuthGuard, RoomGuard)
  public async deleteBookingRoomById(
    @Param('id') roomId: number,
    @Param('bookingRoomId') bookingRoomId: number,
    @Res() res: Response,
  ) {
    await this.roomService.deleteBookingRoomById(bookingRoomId);

    return res.status(HttpStatus.OK).json({
      msg: `Delete room booking successfully`,
    });
  }
}
