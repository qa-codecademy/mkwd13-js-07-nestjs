import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { NotFoundError } from 'rxjs';

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

    const tokenPayload = {
      sub: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload, {
      expiresIn: '1m',
      secret: 'taen_kluc_za_access_token',
    });

    const refreshToken = await this.jwtService.signAsync(tokenPayload, {
      expiresIn: '2m',
      secret: 'a_ovoj_za_refresh_token',
    });

    await this.userRepository.update(existingUser.id, { refreshToken });

    return {
      user: existingUser,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync<{ email: string }>(
        token,
        {
          secret: 'a_ovoj_za_refresh_token',
        },
      );
      console.log(payload);

      const existingUser = await this.userRepository.findOneBy({
        email: payload.email,
      });

      if (existingUser?.refreshToken !== token) {
        throw new UnauthorizedException('Refresh token is not valid');
      }

      if (!existingUser) {
        throw new UnauthorizedException('Refresh token is not valid');
      }

      const tokenPayload = {
        sub: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      };

      const accessToken = await this.jwtService.signAsync(tokenPayload, {
        expiresIn: '1m',
        secret: 'taen_kluc_za_access_token',
      });

      const refreshToken = await this.jwtService.signAsync(tokenPayload, {
        expiresIn: '2m',
        secret: 'a_ovoj_za_refresh_token',
      });

      await this.userRepository.update(existingUser.id, { refreshToken });

      return {
        user: existingUser,
        accessToken,
        refreshToken,
      };
    } catch {
      throw new UnauthorizedException('Refresh token is not valid');
    }
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

  async getUserInfo(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }

    return user;
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
