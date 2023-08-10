import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import * as dayjs from 'dayjs';

import { Date } from './date.note.entity';

@Table({ tableName: 'notes' })
export class Note extends Model<Note> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Shopping list', required: true })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Task', required: true })
  @Column({ type: DataType.STRING, allowNull: false })
  category: string;

  @ApiProperty({ example: 'Tomatoes, bread', required: true })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @HasMany(() => Date)
  dates: string[];

  @ApiHideProperty()
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isArchived: boolean;

  get created() {
    return dayjs(this.createdAt).format('MMMM DD, YYYY');
  }
}
