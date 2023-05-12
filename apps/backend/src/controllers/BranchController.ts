import { BranchService } from '@/services/BranchService';
import { BranchCreateDto, BranchUpdateDto } from '@/utils/dtos/BranchDto';
import { AdminGuard } from '@/utils/guards/AdminGuard';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import { BranchGuard } from '@/utils/guards/BranchGuard';
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

@Controller('branchs')
export class BranchController {
  public constructor(private readonly branchService: BranchService) {}

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  public async createNewBranch(
    @Body() body: BranchCreateDto,
    @Res() res: Response,
  ) {
    await this.branchService.createBranch(body);
    return res
      .status(HttpStatus.CREATED)
      .json({ msg: `Create branch ${body.name} successfully` });
  }

  @Get()
  @UseGuards(AuthGuard, AdminGuard)
  public async getAllBranch(@Res() res: Response) {
    const branchs = await this.branchService.getAllBranch();
    return res.status(HttpStatus.OK).json(branchs);
  }

  @Get(':id')
  @UseGuards(AuthGuard, AdminGuard, BranchGuard)
  public async getBranchById(@Param('id') id: number, @Res() res: Response) {
    const branch = await this.branchService.getBranchById(id);
    return res.status(HttpStatus.OK).json(branch);
  }

  @Put(':id')
  @UseGuards(AuthGuard, AdminGuard, BranchGuard)
  public async updateBranchById(
    @Param('id') id: number,
    @Body() body: BranchUpdateDto,
    @Res() res: Response,
  ) {
    await this.branchService.updateBranchById(id, body);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Update branch id ${id} successfully` });
  }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard, BranchGuard)
  public async deleteBranchById(@Param('id') id: number, @Res() res: Response) {
    await this.branchService.deleteBranchById(id);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Delete branch id ${id} successfully` });
  }
}
