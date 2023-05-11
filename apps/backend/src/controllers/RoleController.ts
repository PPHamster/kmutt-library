import { RoleService } from '@/services/RoleService';
import { RoleCreateDto, RoleUpdateDto } from '@/utils/dtos/RoleDto';
import { AdminGuard } from '@/utils/guards/AdminGuard';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import { RoleGuard } from '@/utils/guards/RoleGuard';
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

@Controller('roles')
export class RoleController {
  public constructor(private readonly roleService: RoleService) {}

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  public async createNewRole(
    @Body() body: RoleCreateDto,
    @Res() res: Response,
  ) {
    await this.roleService.createRole(body);
    return res
      .status(HttpStatus.CREATED)
      .json({ msg: `Create role ${body.name} successfully` });
  }

  @Get()
  @UseGuards(AuthGuard, AdminGuard)
  public async getAllRole(@Res() res: Response) {
    const roles = await this.roleService.getAllRole();
    return res.status(HttpStatus.OK).json(roles);
  }

  @Get(':id')
  @UseGuards(AuthGuard, AdminGuard, RoleGuard)
  public async getRoleById(@Param('id') id: number, @Res() res: Response) {
    const role = await this.roleService.getRoleById(id);
    return res.status(HttpStatus.OK).json(role);
  }

  @Put(':id')
  @UseGuards(AuthGuard, AdminGuard, RoleGuard)
  public async updateRoleById(
    @Param('id') id: number,
    @Body() body: RoleUpdateDto,
    @Res() res: Response,
  ) {
    await this.roleService.updateRoleById(id, body);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Update role id ${id} successfully` });
  }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard, RoleGuard)
  public async deleteRoleById(@Param('id') id: number, @Res() res: Response) {
    await this.roleService.deleteRoleById(id);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Delete role id ${id} successfully` });
  }
}
