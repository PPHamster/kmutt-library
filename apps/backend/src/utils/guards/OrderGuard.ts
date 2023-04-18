import { OrderService } from '@/services/OrderService';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Order, User } from 'api-schema';
import { Request } from 'express';

type Params = {
  id: number | undefined;
  bookId: number | undefined;
};

@Injectable()
export class OrderGuard implements CanActivate {
  public constructor(private readonly orderService: OrderService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest<Request>();
    const { id, bookId } = params as unknown as Params;
    const currentUser = user as User;

    const order: Order = await this.orderService.getOrderDetailById(id);
    if (
      order.userId !== currentUser.id &&
      currentUser.branch !== 'Staff' &&
      currentUser.branch !== 'Admin'
    ) {
      throw new ForbiddenException();
    }

    if (bookId) {
      await this.orderService.getOrderItemById(order.id, bookId);
    }

    return true;
  }
}
