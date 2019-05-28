import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Scene from './scene';

@Table
class Action extends Model<Action> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @ForeignKey(() => Scene)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  curSceneId!: number;

  @ForeignKey(() => Scene)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  nextSceneId!: number;

  @BelongsTo(() => Scene)
  curScene!: Scene;

  @BelongsTo(() => Scene)
  nextScene!: Scene;
}

export default Action;
