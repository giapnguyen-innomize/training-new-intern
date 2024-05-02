
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app/app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  await app.listen(process.env.PORT || 3000);
  Logger.log(
    `🚀 Application is running on: http://localhost:${process.env.PORT}/${globalPrefix}`
  );
}

bootstrap();
