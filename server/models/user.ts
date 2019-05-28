import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Adventure from './adventure';
import AdventureUser from './adventure_user';

@Table
class User extends Model<User> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  login!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.TEXT)
  avatar!: string;

  @BelongsToMany(() => Adventure, () => AdventureUser)
  adventures!: Adventure[];
}

export default User;
