import { config as initEnv } from 'dotenv';

initEnv();

export const SERVER_CONFIG = { PORT: Number(process.env.APP_PORT) };

export const DATABASE_CONFIG = {
  token: process.env.DATABASE_TOKEN as string,
};

export const CLOUD_CONFIG = {
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  cloud_name: process.env.CLOUD_NAME,
};
