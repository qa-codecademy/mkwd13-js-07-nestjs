import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  // Session middleware
  app.use(cookieParser());

  app.use(
    session({
      secret:
        'long-extremely-save-key-phrase-which-is-hard-to-guess-something-like-this-one', // keep this in .env file!!!
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600, // 1 hour - this is in MS
        secure: process.env.NODE_ENV === 'production', // secure: true ensures the cookie is only sent over HTTPS in production environments
        httpOnly: true, // httpOnly: true prevents JavaScript access to the cookie, protecting against XSS attacks
        sameSite: 'lax', // Allows cookies to be sent in cross-site requests when navigating from external sites
      },
    }),
  );

  // Validation and transformation pipe for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Swagger docs setup / config
  const config = new DocumentBuilder()
    .setTitle('Auth example')
    .setDescription('Example for auth')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
