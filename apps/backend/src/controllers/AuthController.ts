import { AuthService } from '@/services/AuthService';
import { UserCreateDto } from '@/utils/dtos/UserDto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() body: UserCreateDto) {
    await this.authService.register(body);
  }
}
