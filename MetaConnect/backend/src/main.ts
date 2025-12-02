import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração CORS
  app.enableCors({
    origin: true, // Permite qualquer origem
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key', 'Origin', 'Accept', 'X-Requested-With'],
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: false,
  });

  app.useGlobalPipes(new ValidationPipe());

  // Prefixo global para todas as rotas da API (exceto health)
  app.setGlobalPrefix('api', {
    exclude: ['/health']
  });

  const config = new DocumentBuilder()
    .setTitle('Maia Advocacia API')
    .setDescription('API para gerenciamento do site da Maia Advocacia')
    .setVersion('1.0')
    .addTag('Leads')
    .addTag('Team')
    .addTag('Testimonials')
    .addTag('Articles')
    .addApiKey(
      { type: 'apiKey', name: 'x-api-key', in: 'header' },
      'API_KEY',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 4000;
  
  console.log(`🔧 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔌 Attempting to bind to port: ${port}`);
  console.log(`🗄️ Database URL: ${process.env.DATABASE_URL ? 'Configured' : 'Missing'}`);
  console.log(`🌍 Server IP info: ${process.env.RENDER ? 'Running on Render' : 'Running locally'}`);
  
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Application is running on port ${port}`);
  console.log(`📚 Swagger available at: http://localhost:${port}/api`);
  console.log(`🌐 Health check: http://localhost:${port}/api`);
}
bootstrap();
