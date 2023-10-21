import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //  全局配置跨域
  app.enableCors({
    // 允许的请求源
    origin: '*',
  });
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(9080);
}
bootstrap();
