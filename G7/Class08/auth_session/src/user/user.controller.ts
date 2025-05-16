import { Body, Controller, Post, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { SessionObject } from './types';

/**
 * Session Management in Authentication:
 * ------------------------------------
 * This controller demonstrates the three key phases of session-based auth:
 * 1. Registration: User account is created (no session yet)
 * 2. Login: Session is created and user ID is stored in it
 * 3. Logout: Session is destroyed
 *
 * The session cookie is automatically handled by the express-session middleware.
 */
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // localhost:3000/user/register
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // Registration doesn't create a session yet
    // The user will need to login separately after registering
    const response = await this.userService.register(createUserDto);

    return createUserDto;
  }

  /**
   * Session Creation During Login:
   * ------------------------------
   * 1. The user provides credentials which are validated
   * 2. If valid, we store user information in the session
   * 3. The @Session() decorator gives us access to the session object
   * 4. express-session middleware will automatically:
   *    - Generate a unique session ID
   *    - Store our data (userId) on the server
   *    - Send a cookie with the session ID to the browser
   *    - This cookie will be included in all future requests from this browser
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Session() session: SessionObject) {
    const user = await this.userService.login(loginDto);

    session.userId = user.id;
    session.loggedIn = true;

    return {
      message: 'Login success',
    };
  }

  @Post('logout')
  async logout(@Session() session: SessionObject & { destroy: () => void }) {
    session.destroy();

    return {
      message: 'Logout success',
    };
  }
}
