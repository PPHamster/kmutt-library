import { Injectable } from '@nestjs/common';
import { OrderRepository } from '@/repositories/OrderRepository';
import { OrderCreateDto } from '@/utils/dtos/OrderDto';

@Injectable()
export class OrderService {

    public constructor(
        private readonly orderRepository: OrderRepository,
      ) {}

    public async getAllOrderByUserId(id: string) {
        return this.orderRepository.getAllOrderByUserId(id)
    }

    public async createNewOrder(body: OrderCreateDto) {

        return this.orderRepository.createNewOrder(body)
    }

    public async getOrderById(user_id: string, id: string) {

        return this.orderRepository.getOrderById(user_id,id)
    }

    public async deleteOrderById(id: string){
        return this.orderRepository.deleteOrderById(id)
    }
}