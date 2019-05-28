import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Achieve from './achive';
import Action from './action';
import Adventure from './adventure';
import SceneAchieve from './scene_achieve';

@Table
class Scene extends Model<Scene> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  description!: string;

  @Column(DataType.STRING)
  picture!: string;

  @BelongsToMany(() => Achieve, () => SceneAchieve)
  achieves!: Achieve[];

  @HasOne(() => Adventure)
  adventure!: Adventure;

  @HasMany(() => Action)
  curForAction!: Action[];
}

export default Scene;
