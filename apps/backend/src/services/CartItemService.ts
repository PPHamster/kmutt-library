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

    const booksCanNotAdd =
      await this.cartItemRepository.getItemCanNotAddCartByUserId(userId);

    if (booksCanNotAdd.some((book) => book.id === bookId)) {
      throw new BadRequestException('You have this book in order now');
    }

    try {
      await this.cartItemRepository.createCartItem(userId, bookId);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException('You have this book in cart');
      }
    }
  }

  public async getAllCartItemByUserId(userId: string) {
    return this.cartItemRepository.getAllCartItemByUserId(userId);
  }

  public async getAllCartItemWithInfoByUserId(userId: string) {
    const books = await this.cartItemRepository.getAllCartItemWithInfoByUserId(
      userId,
    );

    const booksWithReady = [];

    for (const book of books) {
      const isBorrow = await this.orderItemRepository.getBorrowedItemByBookId(
        book.id,
      );

      booksWithReady.push({
        ...book,
        isReady: isBorrow ? 0 : 1,
      });
    }

    return booksWithReady;
  }

  public async deleteCartItemById(userId: string, bookId: number) {
    return this.cartItemRepository.deleteCartItemById(userId, bookId);
  }
}
