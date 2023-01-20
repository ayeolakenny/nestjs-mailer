import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as requestIp from 'request-ip';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(requestIp.mw());
  app.enableCors({});
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
