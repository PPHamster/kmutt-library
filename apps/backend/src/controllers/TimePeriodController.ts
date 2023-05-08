import { TimePeriodService } from '@/services/TimePeriodService';
import {
  TimePeriodCreateDto,
  TimePeriodUpdateDto,
} from '@/utils/dtos/TimePeriodDto';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import { StaffGuard } from '@/utils/guards/StaffGuard';
import { TimePeriodGuard } from '@/utils/guards/TimePeriodGuard';
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

@Controller('time-periods')
export class TimePeriodController {
  public constructor(private readonly timePeriodService: TimePeriodService) {}

  @Post()
  @UseGuards(AuthGuard, StaffGuard)
  public async createNewTimePeriod(
    @Body() body: TimePeriodCreateDto,
    @Res() res: Response,
  ) {
    await this.timePeriodService.createTimePeriod(body);
    return res.status(HttpStatus.CREATED).json({
      msg: `Create time period ${body.beginTime} to ${body.endTime} successfully`,
    });
  }

  @Get()
  public async getAllTimePeriod(@Res() res: Response) {
    const timePeriods = await this.timePeriodService.getAllTimePeriod();
    return res.status(HttpStatus.OK).json(timePeriods);
  }

  @Get(':id')
  @UseGuards(AuthGuard, TimePeriodGuard)
  public async getTimePeriodById(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    const timePeriod = await this.timePeriodService.getTimePeriodById(id);
    return res.status(HttpStatus.OK).json(timePeriod);
  }

  @Put(':id')
  @UseGuards(AuthGuard, StaffGuard, TimePeriodGuard)
  public async updateTimePeriodById(
    @Param('id') id: number,
    @Body() body: TimePeriodUpdateDto,
    @Res() res: Response,
  ) {
    await this.timePeriodService.updateTimePeriodById(id, body);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Update time period id ${id} successfully` });
  }

  @Delete(':id')
  @UseGuards(AuthGuard, StaffGuard, TimePeriodGuard)
  public async deleteTimePeriodById(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    await this.timePeriodService.deleteTimePeriodById(id);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Delete time period id ${id} successfully` });
  }
}
