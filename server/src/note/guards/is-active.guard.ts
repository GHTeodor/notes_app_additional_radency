import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IsActiveGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { note } = context.switchToHttp().getRequest();

    return !note.isArchived;
  }
}
