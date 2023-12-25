import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
require('dotenv').config();

const port = process.env.PG_PORT || 4000;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });

  app.use(helmet());

  await app.listen(port);

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();

  return serverlessExpress({ app: expressApp });
}

bootstrap().then(() => {
  console.log('App is running on %s port', port);
});

let server: Handler;

export const handler: Handler = async (
  event: any,

  context: Context,

  callback: Callback,
) => {
  console.log('event:', event);

  server = server ?? (await bootstrap());

  return server(event, context, callback);
};