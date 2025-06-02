import { Role } from './role.enum';

export interface ICurrentUser {
  id: string;
  email: string;
  role: Role;
}
