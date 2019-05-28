import { AllowNull, Column, DataType, Default, ForeignKey, Model, Table } from 'sequelize-typescript';
import Adventure from './adventure';
import User from './user';

@Table
class AdventureUser extends Model<AdventureUser> {
  @ForeignKey(() => Adventure)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  advId!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId!: number;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  winCount!: number;
}

export default AdventureUser;
