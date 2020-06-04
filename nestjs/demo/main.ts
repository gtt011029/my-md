// 应用层序的入口文件，它使用NestFactory用来创建Nest应用实例
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Running at http://localhost:3000/')
}
bootstrap();