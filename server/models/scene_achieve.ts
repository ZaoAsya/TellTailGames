import { AllowNull, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Achieve from './achive';
import Scene from './scene';

@Table
class SceneAchieve extends Model<SceneAchieve> {
  @ForeignKey(() => Achieve)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  achieveId!: number;

  @ForeignKey(() => Scene)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  sceneId!: number;
}

export default SceneAchieve;
