import { OrderService } from '@/services/OrderService';
import { Controller, Delete, Get, Put, Param} from '@nestjs/common';

@Controller('orders')
export class OrderController {

    public constructor(private readonly orderService: OrderService) {}
  
    @Get('user_id')
    public async getAllOrderByUserId(@Param('user_id') user_id: string) {
        await this.orderService.getAllOrderByUserId(user_id)
    }

    @Get('user_id/id')
    public async getOrderById(@Param('id') id: string, @Param('user_id') user_id: string) {
        await this.orderService.getOrderById(user_id,id)
    }

    @Put('')
    public async createNewOrder() {
        await this.orderService.createNewOrder()
    }

    @Delete('')
    public async deleteOrder(@Param('id') id: string){
        await this.orderService.deleteOrderById(id)
    }
}