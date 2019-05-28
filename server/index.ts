import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import 'isomorphic-fetch';
import nextjs from 'next';
import * as path from 'path';
import { SERVER_CONFIG } from './config';
import render from './middlewares/render';
import db from './models/index';
import router from './routes/index';

const app: express.Application = express();
const nextApp = nextjs({ dev: process.env.NODE_ENV !== 'production' });

app.use(express.static(path.join(__dirname, '/public/')));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(render(nextApp));

router(app);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.sendStatus(500);
});

db.databaseVersion()
  .then(() => {
    nextApp.prepare().then(() => {
      console.info('Connection with db OK ');
      app.listen(process.env.PORT || SERVER_CONFIG.PORT, () => {
        console.info(`TellTailGames listening on port ${SERVER_CONFIG.PORT}!`);
      });
    });
  })
  .catch((err: Error) => {
    throw err;
  });
