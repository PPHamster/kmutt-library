import { AuthService } from '@/services/AuthService';
import { UserCreateDto, UserLoginDto } from '@/utils/dtos/UserDto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() body: UserCreateDto, @Res() res: Response) {
    await this.authService.register(body);
    return res
      .status(HttpStatus.CREATED)
      .json({ msg: `Created user id : ${body.id} successfully` });
  }

  @Post('login')
  public async login(@Body() body: UserLoginDto, @Res() res: Response) {
    const jwt = await this.authService.login(body);

    res.cookie('jwt', jwt, { httpOnly: true });
    return res.status(HttpStatus.OK).json({ msg: 'login success' });
  }

  @Get('me')
  public async me(@Req() req: Request, @Res() res: Response) {
    const data = await this.authService.me(req);

    return res.status(HttpStatus.OK).json(data);
  }

  @Get('logout')
  public async logout(@Res() res: Response) {
    res.clearCookie('jwt');

    return res.status(HttpStatus.OK).json({ msg: 'logout success' });
  }
}
