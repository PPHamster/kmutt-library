import { AuthModule } from '@/modules/AuthModule';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/modules/DatabaseModule';
import { BlogController } from '@/controllers/BlogController';
import { BlogService } from '@/services/BlogService';
import { BlogRepository } from '@/repositories/BlogRepository';
import { TagService } from '@/services/TagService';
import { TagRepository } from '@/repositories/TagRepository';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [BlogController],
  providers: [BlogService, TagService, BlogRepository, TagRepository],
})
export class BlogModule {}
