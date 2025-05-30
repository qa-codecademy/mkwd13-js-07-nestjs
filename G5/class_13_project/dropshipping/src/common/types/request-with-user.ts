import { Request } from 'express';
import { ICurrentUser } from './current-user';

export interface RequestWithUser extends Request {
  user: ICurrentUser;
}
