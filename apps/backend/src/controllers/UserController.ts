import { UserService } from '@/services/UserService';
import {
  UserUpdateByAdminDto,
  UserUpdateDto,
  UserUpdateImageDto,
} from '@/utils/dtos/UserDto';
import {
  Controller,
  Get,
  HttpStatus,
  Res,
  Param,
  Put,
  Body,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import { Response } from 'express';
import { UserGuard } from '@/utils/guards/UserGuard';
import { AdminGuard } from '@/utils/guards/AdminGuard';

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllUser(@Res() res: Response) {
    const users = await this.userService.getAllUserWithRoleAndBranch();
    return res.status(HttpStatus.OK).json(users);
  }

  @Get('admin')
  public async getAllUserFromAdmin(@Res() res: Response) {
    const users = await this.userService.getAllUserWithRoleAndBranchFromAdmin();
    return res.status(HttpStatus.OK).json(users);
  }

  @Get(':userId')
  public async getUserById(@Param('userId') id: string, @Res() res: Response) {
    const user = await this.userService.getUserById(id);
    return res.status(HttpStatus.OK).json(user);
  }

  @Put(':userId')
  @UseGuards(AuthGuard, UserGuard)
  public async updateUserById(
    @Param('userId') id: string,
    @Body() body: UserUpdateDto,
    @Res() res: Response,
  ) {
    await this.userService.updateUserById(body, id);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Update user id ${id} success` });
  }

  @Put(':userId/admin')
  @UseGuards(AuthGuard, AdminGuard)
  public async updateUserByIdFromAdmin(
    @Param('userId') id: string,
    @Body() body: UserUpdateByAdminDto,
    @Res() res: Response,
  ) {
    await this.userService.updateUserByIdFromAdmin(body, id);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Update user id ${id} from admin success` });
  }

  @Delete(':userId')
  @UseGuards(AuthGuard, AdminGuard)
  public async deleteUserById(
    @Param('userId') id: string,
    @Res() res: Response,
  ) {
    await this.userService.deleteUserById(id);
    res.clearCookie('jwt');
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Delete user id ${id} success` });
  }

  @Put(':userId/image')
  @UseGuards(AuthGuard, UserGuard)
  public async updateUserImageById(
    @Param('userId') id: string,
    @Body() body: UserUpdateImageDto,
    @Res() res: Response,
  ) {
    await this.userService.updateUserImageById(body, id);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Update user image id ${id} success` });
  }

  @Delete(':userId/image')
  @UseGuards(AuthGuard, UserGuard)
  public async deleteUserImageById(
    @Param('userId') id: string,
    @Res() res: Response,
  ) {
    await this.userService.deleteUserImageById(id);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Delete user image id ${id} success` });
  }
}
