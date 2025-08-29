import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Importe ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão no DTO
      transform: true, // Transforma automaticamente os payloads em instâncias de DTO
      forbidNonWhitelisted: true, // Lança um erro se propriedades não permitidas forem enviadas
    }),
  );

  // Opcional: Habilitar CORS se seu frontend estiver em uma porta diferente
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(3001); // Certifique-se de que esta é a porta que seu docker-compose expõe
}
bootstrap();
