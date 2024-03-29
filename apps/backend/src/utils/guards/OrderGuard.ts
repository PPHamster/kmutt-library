import { OrderService } from '@/services/OrderService';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { User } from 'api-schema';
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

    const order = await this.orderService.getOrderById(id);

    if (!order) {
      throw new BadRequestException(`No order id ${id}`);
    }

    if (
      order.userId !== currentUser.id &&
      currentUser.branch !== 'Staff' &&
      currentUser.branch !== 'Admin'
    ) {
      throw new ForbiddenException();
    }

    if (bookId) {
      const bookInOrder = await this.orderService.getOrderItemById(
        order.id,
        bookId,
      );

      if (!bookInOrder) {
        throw new BadRequestException(
          `No book id ${bookId} in order id ${order.id}`,
        );
      }
    }

    return true;
  }
}
