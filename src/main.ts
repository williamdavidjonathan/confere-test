import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API de entregas Confere')
    .setDescription('API de rotas de entregas para teste do confere')
    .setVersion('1.0')
    .addTag('Clientes')
    .addTag('Endereços')
    .addTag('Rotas')
    .build();

  const document = SwaggerModule.createDocument(app, config, {});

  document.tags = [
    {
      name: 'Clientes',
      description: 'Clientes.',
    },
    {
      name: 'Endereços',
      description: 'Endereços relacionados ao cliente.',
    },
    {
      name: 'Rotas',
      description: 'Rotas de endereços a serem entregues.',
    },
  ];

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
