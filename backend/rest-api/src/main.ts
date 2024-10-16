import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('tiny'));

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('v1');

  const docBuilder = new DocumentBuilder()
    .setTitle('3hundred API')
    .setDescription('desc')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, docBuilder);
  SwaggerModule.setup('docs', app, document);

  await app.listen(8080);
}
bootstrap();
