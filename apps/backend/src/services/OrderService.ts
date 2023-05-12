import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderRepository } from '@/repositories/OrderRepository';
import { OrderItemRepository } from '@/repositories/OrderItemRepository';
import { MailService } from '@/services/MailService';
import { CartItemRepository } from '@/repositories/CartItemRepository';
import { OrderWithItems } from 'api-schema';

@Injectable()
export class OrderService {
  public constructor(
    private readonly mailService: MailService,
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly cartItemRepository: CartItemRepository,
  ) {}

  private async manageBookQueueById(orderId: number, bookId: number) {
    const detail =
      await this.orderItemRepository.getBookDetailAndEmailFromOrderItemId(
        orderId,
        bookId,
      );

    if (!detail) {
      throw new BadRequestException(
        `No Book Id ${bookId} In Order Id ${orderId}`,
      );
    }

    if (!(await this.orderItemRepository.getBorrowedItemByBookId(bookId))) {
      const currentTime = new Date();
      await this.orderItemRepository.updateOrderItemById(
        orderId,
        bookId,
        'receivedDate = ?, latestNotify = ?',
        [currentTime, currentTime],
      );

      await this.mailService.sendEmail({
        subject: `You have received ${detail.title}.`,
        text: 'You must return this book within 7 days or you will be charged a fine of 5 baht per day.',
        to: detail.email,
        attachments: [
          {
            filename: `${detail.title}.png`,
            path: detail.image,
          },
        ],
      });

      let notifyLeft = 7;

      const timeOutInterval = setInterval(async () => {
        if (await this.orderItemRepository.getBorrowedItemByBookId(bookId)) {
          notifyLeft -= 2;
          if (notifyLeft === 1) {
            clearInterval(timeOutInterval);
          }
          await this.mailService.sendEmail({
            subject: `There are ${notifyLeft} more days left for ${detail.title}.`,
            text: `You must return this book within ${notifyLeft} days or you will be charged a fine of 5 baht per day.`,
            to: detail.email,
            attachments: [
              {
                filename: `${detail.title}.png`,
                path: detail.image,
              },
            ],
          });

          await this.orderItemRepository.updateOrderItemById(
            orderId,
            bookId,
            'latestNotify = ?',
            [new Date()],
          );
        } else {
          clearInterval(timeOutInterval);
        }
      }, 30 * 1000);
    } else {
      await this.orderItemRepository.updateOrderItemById(
        orderId,
        bookId,
        'latestNotify = ?',
        [new Date()],
      );

      const allItemInQueue =
        await this.orderItemRepository.getAllItemInQueueByBookId(bookId);

      await this.mailService.sendEmail({
        subject: `You still have ${allItemInQueue.length} queues left for ${detail.title}`,
        text: `If it's your queue. An email will be sent to you.`,
        to: detail.email,
        attachments: [
          {
            filename: `${detail.title}.png`,
            path: detail.image,
          },
        ],
      });
    }
  }

  public async createNewOrder(userId: string) {
    const itemCount = await this.orderItemRepository.getOrderItemCountByUserId(
      userId,
    );

    const allCartItem = await this.cartItemRepository.getAllCartItemByUserId(
      userId,
    );

    if (allCartItem.length === 0) {
      throw new BadRequestException("Don't have book in this order");
    }

    const bookIdArray = allCartItem.map((cartItem) => {
      return cartItem.bookId;
    });

    if (itemCount + bookIdArray.length > 5) {
      throw new BadRequestException(
        'If implemented, the book will more than 5 books.',
      );
    }

    await this.orderRepository.createNewOrder(userId);
    const orderId = await this.orderRepository.getLatestOrderIdByUserId(userId);
    const value: number[] = [];

    const query = bookIdArray
      .map((bookId) => {
        value.push(orderId, bookId);
        return `(?, ?)`;
      })
      .join(', ');

    await this.orderItemRepository.createNewOrderItems(query, value);

    bookIdArray.forEach((bookId) => {
      this.manageBookQueueById(orderId, bookId);
    });

    await this.cartItemRepository.deleteCartItemByUserId(userId);
  }

  public async getAllOrderByUserId(id: string): Promise<OrderWithItems[]> {
    const orders = await this.orderRepository.getAllOrderByUserId(id);
    const ordersWithItems: OrderWithItems[] = [];
    for (const order of orders) {
      ordersWithItems.push({
        ...order,
        items: await this.orderItemRepository.getOrderItemsByOrderId(order.id),
      });
    }
    return ordersWithItems;
  }

  public async getOrderById(id: number) {
    return this.orderRepository.getOrderById(id);
  }

  public async getOrderWithItemsById(id: number): Promise<OrderWithItems> {
    const order = await this.orderRepository.getOrderById(id);
    return {
      ...order,
      items: await this.orderItemRepository.getOrderItemsByOrderId(order.id),
    };
  }

  public async getOrderItemById(orderId: number, bookId: number) {
    return this.orderItemRepository.getOrderItemById(orderId, bookId);
  }

  public async getChargeById(orderId: number, bookId: number) {
    const orderItem = await this.getOrderItemById(orderId, bookId);
    const dayCount = Math.floor(
      (new Date(orderItem.returnedDate).getTime() -
        new Date(orderItem.receivedDate).getTime()) /
        (1000 * 60 * 60 * 24),
    );

    return dayCount >= 7 ? (dayCount - 6) * 5 : 0;
  }

  public async updateOrderById(id: number, userId: string) {
    return this.orderRepository.updateOrderById(id, userId);
  }

  public async returnItemById(orderId: number, bookId: number) {
    await this.orderItemRepository.updateOrderItemById(
      orderId,
      bookId,
      'returnedDate = ?',
      [new Date()],
    );

    const orderItems = await this.orderItemRepository.getAllItemInQueueByBookId(
      bookId,
    );

    if (!orderItems[0]) return;

    this.manageBookQueueById(orderItems[0].orderId, bookId);
  }

  public async deleteOrderItemById(orderId: number, bookId: number) {
    const bookInOrder = await this.getOrderItemById(orderId, bookId);

    if (bookInOrder.returnedDate) {
      throw new BadRequestException('You have already returned this book.');
    }

    if (bookInOrder.receivedDate) {
      throw new BadRequestException('You are currently borrowing this book.');
    }

    await this.orderItemRepository.deleteOrderItemById(orderId, bookId);
  }

  public async deleteOrderById(id: number) {
    return this.orderRepository.deleteOrderById(id);
  }
}
