import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  DefaultScope,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Scene from './scene';
import SceneAchieve from './scene_achieve';

@Table
class Achieve extends Model<Achieve> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  picture!: string;

  @BelongsToMany(() => Scene, () => SceneAchieve)
  scene!: Scene[];
}

export default Achieve;
