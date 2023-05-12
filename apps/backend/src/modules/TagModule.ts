import { AuthModule } from '@/modules/AuthModule';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/modules/DatabaseModule';
import { TagController } from '@/controllers/TagController';
import { TagService } from '@/services/TagService';
import { TagRepository } from '@/repositories/TagRepository';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [TagController],
  providers: [TagService, TagRepository],
})
export class TagModule {}
