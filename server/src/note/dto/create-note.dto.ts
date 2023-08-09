import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ example: 'Shopping list', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Task', required: true })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'Tomatoes, bread', required: true })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: ['31/12/2023'], required: false })
  @IsArray()
  @IsOptional()
  dates: string[];
}
