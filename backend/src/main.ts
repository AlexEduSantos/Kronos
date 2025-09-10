// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { Pool } from 'pg';
import * as createPgSession from 'connect-pg-simple';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
        sameSite: 'none',
        secure: true, 
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3001);
}
bootstrap();
