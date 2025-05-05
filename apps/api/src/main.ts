import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Kolo')
    .setDescription('kolo backend swagger')
    .setVersion('1.0')
    .addTag('User')
    .addTag('Auth')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, documentFactory);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: 'GET,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
