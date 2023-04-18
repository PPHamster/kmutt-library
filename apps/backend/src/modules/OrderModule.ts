import { OrderController } from '@/controllers/OrderController';
import { OrderRepository } from '@/repositories/OrderRepository';
import { OrderService } from '@/services/OrderService';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/modules/DatabaseModule';
import { AuthModule } from '@/modules/AuthModule';
import { OrderItemRepository } from '@/repositories/OrderItemRepository';
import { MailService } from '@/services/MailService';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [OrderController],
  providers: [OrderService, MailService, OrderRepository, OrderItemRepository],
})
export class OrderModule {}
