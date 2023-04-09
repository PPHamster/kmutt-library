import { OrderCreateDto } from '@/utils/dtos/OrderDto';
import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';

@Injectable()
export class OrderRepository {
    public constructor(
        @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
    ) { }
 
    public async getAllOrderByUserId(id: string) {
        return await this.connection.query(
            'SELECT * FROM `Order` WHERE userId = (?)',
            [
                id
            ],
        )
    }

    public async createNewOrder(data: OrderCreateDto) {
        await this.connection.query(
            'INSERT INTO `Order` (userId) VALUES (?)',
            [
                data.userId
            ],
        );
    }

    public async getOrderById(user_id: string, id: string) {
        return await this.connection.query(
            'SELECT * FROM `Order` WHERE userId = (?) AND id = (?)',
            [
                user_id,
                id
            ]
        );
    }

    public async deleteOrderById(id: string) {
        await this.connection.query(
            'DELETE FROM `Order` WHERE id = (?)',
            [
                id
            ]
        );
    }
}