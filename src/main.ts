import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.ALLOWED_HOSTS || '*',
  });
  await app.listen(process.env.APPLICATION_PORT || 3000,  '0.0.0.0');
}
bootstrap();
