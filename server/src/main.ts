import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1/');

  //walidacja
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // pozwala na modyfikacje danych
      whitelist: true, // usuwa parametry niezadeklarowane w dto
      forbidNonWhitelisted: true, //zwraca blad jesli dane nie powinny byc w dto
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(9000);
}

bootstrap();
