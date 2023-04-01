import { AuthService } from '@/services/AuthService';
import { Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}
}
