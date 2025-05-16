import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true, // will throw an error if the dto contains extra parameter
    }),
  );

  /**
   * Session Configuration:
   * ---------------------
   * This sets up the express-session middleware which handles all session management:
   *
   * 1. secret: Used to sign the session ID cookie to prevent tampering
   *    - In production, this should be a complex, environment-specific value
   *
   * 2. resave: Forces the session to be saved back to the session store, even if
   *    the session wasn't modified during the request
   *    - false is generally recommended to avoid race conditions
   *
   * 3. saveUninitialized: Forces a session that is "uninitialized" to be saved to the store
   *    - An "uninitialized" session is a new session that hasn't been modified yet
   *    - Setting to false prevents storing empty sessions, reducing database load
   *    - Helps with GDPR compliance by not setting cookies until user agrees
   *
   * 4. cookie settings:
   *    - maxAge: How long (in ms) the session will stay valid (1 hour here)
   *    - secure: When true, only sends the cookie over HTTPS
   *    - httpOnly: Prevents client-side JavaScript from accessing the cookie
   *    - sameSite: Controls how cookies are sent with cross-site requests
   *
   * NOTE: By default, express-session uses in-memory storage, which is NOT suitable
   * for production. In real apps, you should use a session store like Redis or a database.
   */

  app.use(
    session({
      secret: 'very_complex_secret',
      resave: false,
      saveUninitialized: false,

      cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour in miliseconds
        secure: process.env.NODE_ENV === 'production', // IN PRODUCTION THIS SHOULD BE TRUE
        httpOnly: true,
      },

      // NOTE: We can use dedicated database to store the session objects
      // It is usefull when the app is big.

      // store: new TypeOrmStore({
      //  ...config for store
      // })
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
