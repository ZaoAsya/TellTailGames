'use strict';

module.exports = {
  // Включаем отладочный режим приложения
  debug: true,

  // Фиксируем порт для локальной разработки
  port: 3000,

  // Статичное содержимое раздаём из приложение через express.static
  staticBasePath: '/'
};
