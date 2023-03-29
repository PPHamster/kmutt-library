import { AppController } from '@/controllers/AppController';
import { AppService } from '@/services/AppService';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/modules/DatabaseModule';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
