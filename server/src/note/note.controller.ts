import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { NoteService } from './note.service';
import { CreateNoteDto, UpdateNoteDto } from './dto';
import { Note } from './entities';
import { RequestExtended } from '../common';
import { IsActiveGuard, IsArchivedGuard, NoteExistsGuard } from './guards';

@ApiTags('Notes')
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(NoteExistsGuard, IsActiveGuard)
  @ApiOperation({ summary: 'Archive note by {id}.' })
  @Get('archive/:id')
  archiveOne(@Param('id') id: string, @Req() req: RequestExtended) {
    return this.noteService.archiveOne(req.note);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(NoteExistsGuard, IsArchivedGuard)
  @ApiOperation({ summary: 'Unarchive note by {id}.' })
  @Get('unarchive/:id')
  unarchiveOne(@Param('id') id: string, @Req() req: RequestExtended) {
    return this.noteService.unarchiveOne(req.note);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get statistics of archived notes by category.' })
  @Get('stats')
  statistics() {
    return this.noteService.statistics();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Set initial notes for database.' })
  @Get('initdb')
  initialDB() {
    return this.noteService.initialDB();
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.noteService.findAll();
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, type: Note })
  @ApiBadRequestResponse({ description: 'Wrong param(-s)' })
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: Note })
  @UseGuards(NoteExistsGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestExtended) {
    return req.note;
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: Note })
  @ApiBadRequestResponse({ description: 'Wrong param(-s)' })
  @UseGuards(NoteExistsGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: RequestExtended,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.noteService.update(req.note, updateNoteDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(NoteExistsGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(+id);
  }
}
