import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Admin } from './admin.schemna';
export const GetAdmin = createParamDecorator(
  (data, ctx: ExecutionContext): Admin => {
    const req = ctx.switchToHttp().getRequest();
    console.log(req.user);
    return req.user;
  },
);
