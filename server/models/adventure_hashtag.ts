import { AllowNull, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Adventure from './adventure';
import Hashtag from './hashtag';

@Table
class AdventureHashtag extends Model<AdventureHashtag> {
  @ForeignKey(() => Adventure)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  advId!: number;

  @ForeignKey(() => Hashtag)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  tagId!: number;
}

export default AdventureHashtag;
