import { Application } from 'express';
import { parse } from 'url';
import { createUser } from './api/create_user';
import { getAdventures } from './api/get_adventures';
import { getTags } from './api/get_tags';
import { getUser } from './api/get_user';
import { saveWin } from './api/save_win';
import home from './pages/home';
import sceneRoute from './pages/scene';
import tagRoute from './pages/tag';

export = (app: Application) => {
  app.get('/', home);
  app.get('/scene/:sceneId', sceneRoute);
  app.get('/registration', (req, res) => res.renderPage('/registration'));
  app.get('/authorization', (req, res) => res.renderPage('/authorization'));
  app.get('/:tagName', tagRoute);

  app.post('/api/adventures', getAdventures);
  app.post('/api/tags', getTags);
  app.post('/api/login', getUser);
  app.post('/api/new_user', createUser);
  app.post('/api/save_win', saveWin);

  app.all('*', (req, res) => {
    const handleRequest = req.nextApp.getRequestHandler();
    const parsedUrl = parse(req.url, true);

    return handleRequest(req, res, parsedUrl);
  });
};
