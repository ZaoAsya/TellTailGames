import { Server } from 'next';

declare global {
  namespace Express {
    // Расширяем интерфейс объекта Request
    interface Request {
      // Добавляем ссылку на Next.js сервер, чтобы иметь к нему доступ в роутере
      nextApp: Server;
    }

    // Расширяем интерфейс объекта Response
    interface Response {
      // Добавляем функцию renderPage, которая будет использоваться для отрисовки страниц
      renderPage(pathname: string, query?: any): void;
    }
  }
}
