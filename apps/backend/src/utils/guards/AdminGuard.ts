import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { User } from 'api-schema';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest<Request>();

    return (user as User).role === 'Admin';
  }
}
