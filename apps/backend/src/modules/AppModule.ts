import { Module } from '@nestjs/common';
import { AuthModule } from '@/modules/AuthModule';
import { UserModule } from '@/modules/UserModule';
import { OrderModule } from '@/modules/OrderModule';
import { RoleModule } from '@/modules/RoleModule';
import { BranchModule } from '@/modules/BranchModule';
import { BookModule } from '@/modules/BookModule';
import { CategoryModule } from '@/modules/CategoryModule';
import { BlogModule } from '@/modules/BlogModule';
import { TagModule } from '@/modules/TagModule';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
    BranchModule,
    BookModule,
    CategoryModule,
    OrderModule,
    BlogModule,
    TagModule,
  ],
})
export class AppModule {}
