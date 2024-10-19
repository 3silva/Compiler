import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, RedisOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<RedisOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6380,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
