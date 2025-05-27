import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid creadentials.');
    }

    return user;
  }
  // TODO: login => IF CREATETIALS ARE VALID GENERATE JWT
  async login(user: User) {
    const jwtPayload = { email: user.email, id: user.id };

    // TODO: Create the token
    const accessToken = 'TOKEN';

    return accessToken;
  }
}
