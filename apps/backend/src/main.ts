import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/AppModule';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  });
  await app.listen(Number(process.env.BACKEND_PORT));
}
bootstrap();
