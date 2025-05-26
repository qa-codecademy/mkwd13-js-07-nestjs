import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookies = createParamDecorator(
  (cookieName: string, ctx: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.switchToHttp().getRequest();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return cookieName ? request.cookies?.[cookieName] : null;
  },
);

// export const Body = createParamDecorator(
//   (cookieName: string, ctx: ExecutionContext) => {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     const request = ctx.switchToHttp().getRequest();

//     // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
//     return cookieName ? request.body : null;
//   },
// );
