import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // config body validation
  app.useGlobalPipes(new ValidationPipe());

  app.use(passport.initialize());
  // app.use(passport.session());
  app.use(cookieParser());

  // config swager
  const swagger = new DocumentBuilder()
    .setTitle('auth session test')
    .setDescription('JTWによるログインのテスト')
    .setVersion('1.0')
    .addCookieAuth('auth-cookie')
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
