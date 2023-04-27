import { TagService } from '@/services/TagService';
import { TagCreateDto, TagUpdateDto } from '@/utils/dtos/TagDto';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import { StaffGuard } from '@/utils/guards/StaffGuard';
import { TagGuard } from '@/utils/guards/TagGuard';
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

@Controller('tags')
export class TagController {
  public constructor(private readonly tagService: TagService) {}

  @Post()
  @UseGuards(AuthGuard, StaffGuard)
  public async createNewTag(@Body() body: TagCreateDto, @Res() res: Response) {
    await this.tagService.createTag(body);
    return res
      .status(HttpStatus.CREATED)
      .json({ msg: `Create Tag ${body.name} successfully` });
  }

  @Get()
  @UseGuards(AuthGuard, StaffGuard)
  public async getAllTag(@Res() res: Response) {
    const tags = await this.tagService.getAllTag();
    return res.status(HttpStatus.OK).json(tags);
  }

  @Get(':id')
  @UseGuards(AuthGuard, StaffGuard, TagGuard)
  public async getTagById(@Param('id') id: number, @Res() res: Response) {
    const tag = await this.tagService.getTagById(id);
    return res.status(HttpStatus.OK).json(tag);
  }

  @Put(':id')
  @UseGuards(AuthGuard, StaffGuard, TagGuard)
  public async updateTagById(
    @Param('id') id: number,
    @Body() body: TagUpdateDto,
    @Res() res: Response,
  ) {
    await this.tagService.updateTagById(id, body);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Update Tag id ${id} successfully` });
  }

  @Delete(':id')
  @UseGuards(AuthGuard, StaffGuard, TagGuard)
  public async deleteTagById(@Param('id') id: number, @Res() res: Response) {
    await this.tagService.deleteTagById(id);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Delete Tag id ${id} successfully` });
  }
}
