import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.API_FRONT,
    credentials: true,
  });

  app.use(cookieParser()); //middleware para leer las cookies

  const swaggerConfig = new DocumentBuilder()
    .setTitle('MyCloset API')
    .setDescription(
      'Esta API es correspondiente al proyecto final de Henry basa en una app de outfits',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
