import type { VercelRequest, VercelResponse } from '@vercel/node';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverless from 'serverless-http';

let cached: any;

async function bootstrap() {
  const ex = express();
  const { AppModule } = await import('../server/dist/app.module.js');
  const app = await NestFactory.create(AppModule, new ExpressAdapter(ex), { logger: false });
  await app.init();
  return serverless(ex);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!cached) cached = await bootstrap();
  return cached(req, res);
}
