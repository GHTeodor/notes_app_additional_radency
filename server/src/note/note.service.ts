import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateNoteDto, UpdateNoteDto } from './dto';
import { Note, Date } from './entities';
import { InitialNotes, initialNotes, noteSchema } from './helpers';

@Injectable()
export class NoteService {
  private readonly initialNotes: InitialNotes[] = initialNotes;

  constructor(
    @InjectModel(Note) private readonly noteRepository: typeof Note,
    @InjectModel(Date) private readonly dateRepository: typeof Date,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    try {
      const { dates, ...noteDto } = createNoteDto;
      const createdNote = await this.noteRepository.create(noteDto);

      if (dates.length) {
        for (const date of dates) {
          await this.dateRepository.create({ noteId: createdNote.id, date });
        }
      }

      const isDataValid = await noteSchema.isValid(createNoteDto);
      if (!isDataValid) {
        throw new Error('Note data is not valid.');
      }

      return createdNote;
    } catch (e) {
      throw new BadRequestException({ message: e.message || 'Bad request' });
    }
  }

  async findAll() {
    return {
      active: await this.noteRepository.findAll({
        where: { isArchived: false },
        include: { all: true },
      }),
      archived: await this.noteRepository.findAll({
        where: { isArchived: true },
        include: { all: true },
      }),
    };
  }

  async findOne(id: number) {
    return this.noteRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async update(note: Note, updateNoteDto: UpdateNoteDto) {
    try {
      const isDataValid = await noteSchema.isValid(updateNoteDto);
      if (!isDataValid) {
        throw new Error('Note data is not valid.');
      }

      if (updateNoteDto?.dates.length) {
        for (const date of updateNoteDto.dates) {
          await this.dateRepository.create({ noteId: note.id, date });
        }
      }

      return note.update({ ...updateNoteDto });
    } catch (e) {
      throw new BadRequestException({ message: e.message || 'Bad request' });
    }
  }

  async remove(id: number) {
    return this.noteRepository.destroy({ where: { id } });
  }

  async statistics() {
    const { archived } = await this.findAll();

    const archivedCounter = archived.reduce(
      (acc: { [key: string]: number }, { category }) => ({
        ...acc,
        [category]: ++acc.category || 1,
      }),
      {},
    );

    const archivedKeys = Object.keys(archivedCounter);

    const activeArr = [];
    for (const category of archivedKeys) {
      activeArr.push({
        [category]: await this.noteRepository.count({
          where: { category, isArchived: false },
        }),
      });
    }

    const activeCounter = activeArr.reduce(
      (acc, obj) => ({ ...acc, ...obj }),
      {},
    );

    return {
      keys: archivedKeys,
      archived: archivedCounter,
      active: activeCounter,
    };
  }

  async archiveOne(note: Note) {
    return note.update({ ...note, isArchived: true });
  }

  async unarchiveOne(note: Note) {
    return note.update({ ...note, isArchived: false });
  }

  async initialDB() {
    try {
      for (const { dates, ...initialNote } of this.initialNotes) {
        const createdNote = await this.noteRepository.create(initialNote);

        for (const date of dates) {
          await this.dateRepository.create({ noteId: createdNote.id, date });
        }
      }
    } catch (e) {
      throw new BadRequestException({ message: e.message || 'Bad request' });
    }
  }
}
