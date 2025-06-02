import { Role } from './role.enum';

export interface JwtPayload {
  sub: string; // id
  email: string;
  role: Role;
}
