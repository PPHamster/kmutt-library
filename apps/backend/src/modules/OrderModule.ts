import { OrderController } from '@/controllers/OrderController';
import { OrderRepository } from '@/repositories/OrderRepository';
import { OrderService } from '@/services/OrderService';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './DatabaseModule';

@Module({
    imports: [DatabaseModule],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository],
  })
  export class OrderModule {}