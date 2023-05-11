import { AuthModule } from './AuthModule';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/modules/DatabaseModule';
import { BookController } from '@/controllers/BookController';
import { BookService } from '@/services/BookService';
import { CartItemService } from '@/services/CartItemService';
import { BookRepository } from '@/repositories/BookRepository';
import { CartItemRepository } from '@/repositories/CartItemRepository';
import { CategoryRepository } from '@/repositories/CategoryRepository';
import { ImageService } from '@/services/ImageService';
import { OrderItemRepository } from '@/repositories/OrderItemRepository';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [BookController],
  providers: [
    ImageService,
    BookService,
    CartItemService,

    BookRepository,
    CategoryRepository,
    CartItemRepository,
    OrderItemRepository,
  ],
})
export class BookModule {}
