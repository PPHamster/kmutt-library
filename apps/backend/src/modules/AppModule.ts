import { Module } from '@nestjs/common';
import { AuthModule } from '@/modules/AuthModule';
import { UserModule } from '@/modules/UserModule';

@Module({
  imports: [AuthModule, UserModule],
})
export class AppModule {}
