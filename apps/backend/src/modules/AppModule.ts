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
import { ImageModule } from '@/modules/ImageModule';
import { EventModule } from '@/modules/EventModule';
import { EventCategoryModule } from '@/modules/EventCategoryModule';
import { RoomModule } from '@/modules/RoomModule';
import { TimePeriodModule } from '@/modules/TimePeriodModule';
import { DashboardModule } from '@/modules/DashboardModule';

@Module({
  imports: [
    ImageModule,
    AuthModule,
    UserModule,
    RoleModule,
    BranchModule,
    BookModule,
    CategoryModule,
    OrderModule,
    BlogModule,
    TagModule,
    EventModule,
    EventCategoryModule,
    RoomModule,
    TimePeriodModule,
    DashboardModule,
  ],
})
export class AppModule {}
