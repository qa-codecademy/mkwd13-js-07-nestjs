import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// localhost:3000/products
// localhost:3000/orders

// localhost:3000 - FE routes
// localhost:3000/api - BE routes

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips (removes) any properties from the incoming request that are not explicitly defined in your DTO.
      forbidNonWhitelisted: true, // Instead of just removing extra properties (as with whitelist), this option will cause the request to be rejected with a 400 error if any non-whitelisted properties are present.
      transform: true, // Automatically transforms payloads (incoming request data) to be objects typed according to their DTO classes.
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Shop API')
    .setDescription('Application for shopping')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
