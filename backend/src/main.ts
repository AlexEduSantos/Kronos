// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as express from 'express';
import * as path from 'path';
import { Pool } from 'pg';
import * as createPgSession from 'connect-pg-simple';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000', // Seu Frontend
      'http://localhost:5678', // Seu n8n Editor
      'http://localhost:5677', // Seu n8n Webhook
      'http://backend:3001', // Comunicação interna
      /http:\/\/localhost:\d{4}/, // Permite qualquer porta localhost (para dev)
    ], // Permite requisições do seu frontend
    credentials: true,
  });

  const pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const PgSession = createPgSession(session);

  const sessionStore = new PgSession({
    pool: pgPool,
    tableName: 'session',
  });

  app.use(
    session({
      store: sessionStore,
      secret: process.env.SESSION_SECRET || 'daf0f7a7c8e2b1d3f5a7b9c1d3e5f7a9b',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: 'lax', // funciona bem em localhost
        secure: false,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // Serve uploaded images from the public/uploads folder at /uploads
  app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

  await app.listen(3001);
}
bootstrap();
