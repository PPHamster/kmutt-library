import { UserService } from '@/services/UserService';
import { UserUpdateImageDto } from '@/utils/dtos/UserDto';
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
import { OwnerGuard } from '@/utils/guards/OwnerGuard';

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllUser(@Res() res: Response) {
    const users = await this.userService.getAllUserWithRoleAndBranch();
    return res.status(HttpStatus.OK).json(users);
  }

  @Get(':userId')
  public async getUserById(@Param('userId') id: string, @Res() res: Response) {
    const user = await this.userService.getUserById(id);
    return res.status(HttpStatus.OK).json(user);
  }

  @Delete(':userId')
  @UseGuards(AuthGuard, OwnerGuard)
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
  @UseGuards(AuthGuard, OwnerGuard)
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
  @UseGuards(AuthGuard, OwnerGuard)
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
