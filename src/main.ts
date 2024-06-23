import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const notificationsMS = await app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:rabbitmq@petitions-rabbitmq:5672'],
        queue: 'notifications-queue',
        noAck: false,
      },
    },
  );
  await app.startAllMicroservices();
  const PORT = process.env.port || 10000
  const HOST = '0.0.0.0'
  await app.listen(PORT, HOST, () => {
    `Server listening on Port ${PORT}, hostname: ${HOST}`
  });
}
bootstrap();
