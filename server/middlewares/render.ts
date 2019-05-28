import { NextFunction as Next, Request, Response } from 'express';
import { Server } from 'next';

export default (nextApp: Server) => (req: Request, res: Response, next: Next) => {
  req.nextApp = nextApp;
  res.renderPage = (pathname: string, query: any) => {
    nextApp.render(req, res, pathname, query);
  };

  next();
};
