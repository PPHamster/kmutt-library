import { AuthModule } from '@/modules/AuthModule';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/modules/DatabaseModule';
import { CategoryRepository } from '@/repositories/CategoryRepository';
import { CategoryController } from '@/controllers/CategoryController';
import { CategoryService } from '@/services/CategoryService';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
