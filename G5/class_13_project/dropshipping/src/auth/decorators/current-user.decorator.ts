import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../../common/types/request-with-user';
import { ICurrentUser } from '../../common/types/current-user';

export const CurrentUser = createParamDecorator(
  (data: keyof ICurrentUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  },
);
