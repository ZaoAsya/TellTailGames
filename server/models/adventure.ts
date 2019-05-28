import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import AdventureHashtag from './adventure_hashtag';
import AdventureUser from './adventure_user';
import Hashtag from './hashtag';
import Scene from './scene';
import User from './user';

@Table
class Adventure extends Model<Adventure> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  description!: string;

  @Column(DataType.TEXT)
  picture!: string;

  @ForeignKey(() => Scene)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  firstSceneId!: number;

  @BelongsToMany(() => Hashtag, () => AdventureHashtag)
  tags!: Hashtag[];

  @BelongsToMany(() => User, () => AdventureUser)
  users!: User[];

  @BelongsTo(() => Scene)
  firstScene!: Scene;
}

export default Adventure;
