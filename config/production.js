'use strict';

const packageJson = require('../package.json');

module.exports = {
  // Выключаем отладочный режим приложения
  debug: false,

  // Порт приложения принимаем из переменной окружения
  // Heroku может подставить в неё любое удобное ему значение
  port: process.env.PORT,

  // Статичное содержимое забираем из Surge
  staticBasePath: 'https://zaoasya-task-2018.surge.sh/'
};
