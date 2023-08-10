import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { NoteService } from '../note.service';

@Injectable()
export class NoteExistsGuard implements CanActivate {
  constructor(private readonly noteService: NoteService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const note = await this.noteService.findOne(+req.params.id);
    if (note) req.note = note;

    return !!note;
  }
}
