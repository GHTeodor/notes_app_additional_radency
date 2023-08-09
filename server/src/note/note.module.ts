import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { Note, Date } from './entities';

@Module({
  imports: [SequelizeModule.forFeature([Note, Date])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
