import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderRepository } from '@/repositories/OrderRepository';
import { OrderItemRepository } from '@/repositories/OrderItemRepository';
import { OrderCreateDto } from '@/utils/dtos/OrderDto';
import { MailService } from '@/services/MailService';

@Injectable()
export class OrderService {
  public constructor(
    private readonly mailService: MailService,
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
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

  public async createNewOrder(data: OrderCreateDto, userId: string) {
    const itemCount = await this.orderItemRepository.getOrderItemCountByUserId(
      userId,
    );

    const uniqueBookIdArray = data.bookIds.filter((value, index, array) => {
      return array.indexOf(value) === index;
    });

    if (itemCount + uniqueBookIdArray.length > 5) {
      throw new BadRequestException(
        'If implemented, the book will more than 5 books.',
      );
    }

    await this.orderRepository.createNewOrder(userId);
    const orderId = await this.orderRepository.getLatestOrderIdByUserId(userId);
    const value: number[] = [];

    const query = uniqueBookIdArray
      .map((bookId) => {
        value.push(orderId, bookId);
        return `(?, ?)`;
      })
      .join(', ');

    await this.orderItemRepository.createNewOrderItems(query, value);

    uniqueBookIdArray.forEach((bookId) => {
      this.manageBookQueueById(orderId, bookId);
    });
  }

  public async getAllOrderByUserId(id: string) {
    const orders = await this.orderRepository.getAllOrderByUserId(id);
    const ordersWithItems = [];
    for (const order of orders) {
      ordersWithItems.push({
        id: order.id,
        createdAt: order.createdAt,
        items: await this.orderItemRepository.getOrderItemsByOrderId(order.id),
      });
    }
    return ordersWithItems;
  }

  public async getOrderById(id: number) {
    const order = await this.orderRepository.getOrderById(id);
    if (!order) throw new BadRequestException('No Order From This Id');
    return {
      id: order.id,
      createdAt: order.createdAt,
      items: await this.orderItemRepository.getOrderItemsByOrderId(order.id),
    };
  }

  public async getOrderDetailById(id: number) {
    const order = await this.orderRepository.getOrderById(id);
    if (!order) throw new BadRequestException('No Order From This Id');
    return order;
  }

  public async getOrderItemById(orderId: number, bookId: number) {
    const bookInOrder = await this.orderItemRepository.getOrderItemById(
      orderId,
      bookId,
    );

    if (!bookInOrder) {
      throw new BadRequestException(
        `No book id ${bookId} in order id ${orderId}`,
      );
    }

    return bookInOrder;
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
