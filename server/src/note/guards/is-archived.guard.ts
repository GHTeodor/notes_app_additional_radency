import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IsArchivedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { note } = context.switchToHttp().getRequest();

    return note.isArchived;
  }
}
