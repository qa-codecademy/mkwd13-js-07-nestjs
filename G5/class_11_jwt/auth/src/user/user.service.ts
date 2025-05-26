import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register({ name, email, password }: RegisterDto) {
    const existingUser = await this.userRepository.findOneBy({
      email,
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return this.userRepository.save(user);
  }

  async login({ email, password }: LoginDto) {
    const existingUser = await this.userRepository.findOneBy({
      email,
    });

    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const arePasswordsMatching = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!arePasswordsMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      {
        expiresIn: '1m',
      },
    );

    return {
      user: existingUser,
      accessToken,
    };
  }

  async profile(token: string) {
    console.log(token);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const tokenInfo = await this.jwtService.verifyAsync(token);

      return {
        name: 'test',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        token: tokenInfo,
      };
    } catch {
      throw new UnauthorizedException('You must log in to see this info!');
    }
  }
}
