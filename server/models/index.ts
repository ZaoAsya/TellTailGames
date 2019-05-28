import { Sequelize } from 'sequelize-typescript';
import { DATABASE_CONFIG } from '../config';
import Achieve from './achive';
import Action from './action';
import Adventure from './adventure';
import AdventureHashtag from './adventure_hashtag';
import AdventureUser from './adventure_user';
import Hashtag from './hashtag';
import Scene from './scene';
import SceneAchieve from './scene_achieve';
import User from './user';

const db = new Sequelize(DATABASE_CONFIG.token);

db.addModels([
  Achieve,
  Action,
  Adventure,
  AdventureUser,
  AdventureHashtag,
  Hashtag,
  Scene,
  SceneAchieve,
  User,
]);

export default db;
