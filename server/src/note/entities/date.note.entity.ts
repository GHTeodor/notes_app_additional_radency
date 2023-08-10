import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Note } from './note.entity';

@Table({ tableName: 'dates' })
export class Date extends Model<Date> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '14/8/2023', required: false })
  @Column({ type: DataType.STRING, allowNull: true })
  date: string;

  @ForeignKey(() => Note)
  @Column({ type: DataType.INTEGER })
  noteId: number;

  @BelongsTo(() => Note)
  note: Note;
}
