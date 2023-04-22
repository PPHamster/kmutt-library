import { CartItemRepository } from '@/repositories/CartItemRepository';
import { OrderItemRepository } from '@/repositories/OrderItemRepository';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CartItemService {
  public constructor(
    private readonly cartItemRepository: CartItemRepository,
    private readonly orderItemRepository: OrderItemRepository,
  ) {}

  public async createCartItem(userId: string, bookId: number) {
    const allCartItem = await this.cartItemRepository.getAllCartItemByUserId(
      userId,
    );

    const orderItemCount =
      await this.orderItemRepository.getOrderItemCountByUserId(userId);

    if (allCartItem.length + orderItemCount >= 5) {
      throw new BadRequestException("Can't add more item");
    }

    await this.cartItemRepository.createCartItem(userId, bookId);
  }

  public async getAllCartItemByUserId(userId: string) {
    return this.cartItemRepository.getAllCartItemByUserId(userId);
  }

  public async getAllCartItemWithInfoByUserId(userId: string) {
    return this.cartItemRepository.getAllCartItemWithInfoByUserId(userId);
  }

  public async deleteCartItemById(userId: string, bookId: number) {
    return this.cartItemRepository.deleteCartItemById(userId, bookId);
  }
}
