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
import AdventureHashtag from './adventure_hashtag';

@Table
class Hashtag extends Model<Hashtag> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  nameRu!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  nameEn!: string;

  @BelongsToMany(() => Adventure, () => AdventureHashtag)
  adventures!: Adventure[];
}

export default Hashtag;
