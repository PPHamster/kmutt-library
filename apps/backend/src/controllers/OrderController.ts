import { OrderService } from '@/services/OrderService';
import { RequestUser } from '@/utils/decorators/AuthDecorator';
import { OrderUpdateDto } from '@/utils/dtos/OrderDto';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import { OrderGuard } from '@/utils/guards/OrderGuard';
import { StaffGuard } from '@/utils/guards/StaffGuard';
import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Res,
  HttpStatus,
  UseGuards,
  Body,
} from '@nestjs/common';
import { User } from 'api-schema';
import { Response } from 'express';

@Controller('orders')
export class OrderController {
  public constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard)
  public async createNewOrder(@RequestUser() user: User, @Res() res: Response) {
    await this.orderService.createNewOrder(user.id);
    return res
      .status(HttpStatus.CREATED)
      .json({ msg: 'New Order Has Been Created' });
  }

  @Get()
  @UseGuards(AuthGuard)
  public async getAllOrderByRequestUser(
    @RequestUser() user: User,
    @Res() res: Response,
  ) {
    const orders = await this.orderService.getAllOrderByUserId(user.id);
    return res.status(HttpStatus.OK).json(orders);
  }

  @Get('user/:userId')
  public async getAllOrderByUserId(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const orders = await this.orderService.getAllOrderByUserId(userId);
    return res.status(HttpStatus.OK).json(orders);
  }

  @Get(':id')
  public async getOrderById(@Param('id') id: number, @Res() res: Response) {
    const order = await this.orderService.getOrderById(id);
    return res.status(HttpStatus.OK).json(order);
  }

  @Get(':id/:bookId/charge')
  public async getChargeById(
    @Param('id') orderId: number,
    @Param('bookId') bookId: number,
    @Res() res: Response,
  ) {
    const charge = await this.orderService.getChargeById(orderId, bookId);
    return res.status(HttpStatus.OK).json(charge);
  }

  @Put(':id')
  @UseGuards(AuthGuard, StaffGuard)
  public async updateOrderById(
    @Param('id') id: number,
    @Body() body: OrderUpdateDto,
    @Res() res: Response,
  ) {
    await this.orderService.updateOrderById(id, body.userId);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Update order id ${id} successfully` });
  }

  @Put(':id/:bookId/return')
  @UseGuards(AuthGuard, OrderGuard)
  public async returnItemById(
    @Param('id') orderId: number,
    @Param('bookId') bookId: number,
    @Res() res: Response,
  ) {
    await this.orderService.returnItemById(orderId, bookId);
    return res.status(HttpStatus.OK).json({
      msg: `Return book id ${bookId} from order id ${orderId} successfully`,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard, OrderGuard)
  public async deleteOrder(@Param('id') id: number, @Res() res: Response) {
    await this.orderService.deleteOrderById(id);
    return res
      .status(HttpStatus.OK)
      .json({ msg: `Order id ${id} has been deleted` });
  }

  @Delete(':id/:bookId')
  @UseGuards(AuthGuard, OrderGuard)
  public async deleteOrderItemById(
    @Param('id') orderId: number,
    @Param('bookId') bookId: number,
    @Res() res: Response,
  ) {
    await this.orderService.deleteOrderItemById(orderId, bookId);
    return res.status(HttpStatus.OK).json({
      msg: `Delete book id ${bookId} from order id ${orderId} successfully`,
    });
  }
}
