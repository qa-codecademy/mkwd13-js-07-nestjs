import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserResponse } from './dtos/user-response.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login-user.dto';
import { LoginResponse } from './dtos/login-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: CreateUserDto): Promise<UserResponse> {
    const foundUser = await this.userRepository.findOneBy({
      username: userData.username,
    });

    if (foundUser) {
      throw new BadRequestException('User with such username already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    const createdUser = await this.userRepository.save(user);

    // delete createdUser.password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, deletedAt, ...restOfTheUser } = createdUser;

    return restOfTheUser;
  }

  async loginUser({ username, password }: LoginDto): Promise<LoginResponse> {
    const foundUser = await this.userRepository.findOneBy({
      username,
    });

    if (!foundUser) {
      throw new UnauthorizedException(`Invalid Credentials`);
    }

    const areMatching = await bcrypt.compare(password, foundUser.password);

    if (!areMatching) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return {
      loggedIn: true,
      user: foundUser,
    };
  }
}

// Spread operator
//     const obj1 = { name: 'test' };
// const obj2 = { id: 1 };
// const fullObj = { ...obj1, ...obj2 };

// Rest operator
// const { id, name, ...theRest } = fullObj;
