import { UserResponse } from './user-response.dto';

export class LoginResponse {
  loggedIn: boolean;

  user: UserResponse;
}
