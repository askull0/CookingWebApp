import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //walidacja
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // pozwala na modyfikacje danych
      whitelist: true, // usuwa parametry niezadeklarowane w dto
      forbidNonWhitelisted: true, //zwraca blad jesli dane nie powinny byc w dto
    }),
  );

  await app.listen(9000);
}
bootstrap();
