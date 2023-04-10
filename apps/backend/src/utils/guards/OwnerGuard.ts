import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { User } from 'api-schema';
import { Request } from 'express';

type Params = {
  userId: string | undefined;
};

@Injectable()
export class OwnerGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest<Request>();
    const { userId } = params as unknown as Params;

    return (user as User).id === userId;
  }
}
