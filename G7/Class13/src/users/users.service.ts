import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ArrayContains, In, Repository } from 'typeorm';
import { User, UserRole } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private configService: ConfigService,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();

    return users.map(({ passwordHash, ...rest }) => rest);
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const passwordHash = await hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      email: createUserDto.email,
      passwordHash: passwordHash,
    });

    const response = await this.userRepository.save(user);

    return response;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    return user;
  }

  async assignRoles(userId: number, roles: UserRole[]) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    user.roles = [...roles];

    await this.userRepository.save(user);
  }

  async addRole(userId: number, role: UserRole) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (!user.roles.includes(role)) {
      user.roles.push(role);
      await this.userRepository.save(user);
    }
  }

  async seedAdmin() {
    const adminExists = await this.userRepository.findOneBy({
      roles: ArrayContains([UserRole.ADMIN]),
    });

    if (!adminExists) {
      const adminEmail = this.configService.get('INITIAL_ADMIN_EMAIL');
      const adminPass = this.configService.get('INITIAL_ADMIN_PASSWORD');

      const adminUser = this.userRepository.create({
        email: adminEmail,
        passwordHash: hashSync(adminPass, 10),
        roles: [UserRole.ADMIN],
      });

      await this.userRepository.save(adminUser);
    }
  }
  // TODO: Remove a role
  // ------------------------------------

  async addRefreshToken(userId: number, refreshToken: string) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.refreshTokens.push(refreshToken);
    await this.userRepository.save(user);
  }

  async removeRefreshToken(userId: number, refreshToken: string) {
    // findOne => same as findOneBy
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.refreshTokens = user.refreshTokens.filter(
      (token) => token !== refreshToken,
    );

    await this.userRepository.save(user);
  }

  async updateRefreshToken(
    userId: number,
    oldRefreshToken: string,
    newRefreshToken: string,
  ) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    user.refreshTokens = user.refreshTokens.filter(
      (token) => token !== oldRefreshToken,
    );

    user.refreshTokens.push(newRefreshToken);

    await this.userRepository.save(user);
  }
}
