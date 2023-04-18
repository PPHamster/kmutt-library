import { Module } from '@nestjs/common';
import { AuthModule } from '@/modules/AuthModule';
import { UserModule } from '@/modules/UserModule';
import { OrderModule } from '@/modules/OrderModule';

@Module({
  imports: [AuthModule, UserModule, OrderModule],
})
export class AppModule {}
