import { OrderService } from '@/services/OrderService';
import { OrderCreateDto } from '@/utils/dtos/OrderDto';
import { Controller, Delete, Get, Post, Put, Param, Body, Res} from '@nestjs/common';
import { Response} from 'express'

@Controller('orders')
export class OrderController {

    public constructor(private readonly orderService: OrderService) {}
  
    @Get(':user_id')
    public async getAllOrderByUserId(@Param('user_id') user_id: string, @Res() res: Response) {
        res.send(JSON.parse(JSON.stringify(await (this.orderService.getAllOrderByUserId(user_id))))[0])
    }

    @Get(':user_id/:id')
    public async getOrderById(@Param('id') id: string, @Param('user_id') user_id: string, @Res() res: Response) {
        res.send(JSON.parse(JSON.stringify(await this.orderService.getOrderById(user_id,id)))[0])
    }

    @Post()
    public async createNewOrder(@Body() body: OrderCreateDto, @Res() res: Response) {
        await this.orderService.createNewOrder(body)
        res.send('Order created successfully')
    }

    @Put('')
    public async updateOrder(){
    }

    @Delete(':id')
    public async deleteOrder(@Param('id') id: string, @Res() res: Response){
        await this.orderService.deleteOrderById(id)
        res.send('Order deleted successfully')
    }
}