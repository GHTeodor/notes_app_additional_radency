import { PartialType } from '@nestjs/mapped-types';

import { CreateNoteDto } from './create-note.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @ApiProperty({ example: 'Shopping list', required: true })
  name: string;

  @ApiProperty({ example: 'Task', required: true })
  category: string;

  @ApiProperty({ example: 'Tomatoes, bread', required: true })
  content: string;

  @ApiProperty({ example: ['31/12/2023'], required: false })
  dates: string[];
}
