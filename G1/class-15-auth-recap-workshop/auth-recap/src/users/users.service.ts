import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

const DUPLICATE_PG_CODE = '23505';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  findAll() {
    return this.usersRepo.find();
  }

  async findById(id: number) {
    try {
      const foundUser = await this.usersRepo.findOneByOrFail({ id });

      return foundUser;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findByEmail(email: string) {
    return this.usersRepo.findOneBy({ email });
  }

  async findUserDetails(id: number) {
    const foundUser = await this.usersRepo.findOne({
      where: { id },
      relations: {
        bookings: true,
      },
    });

    if (!foundUser) throw new NotFoundException('User not found');

    return foundUser;
  }

  async create(createData: CreateUserDto) {
    try {
      //1. Create new user in the database
      const newUser = await this.usersRepo.save(createData);

      return newUser;
    } catch (error) {
      if (error.code === DUPLICATE_PG_CODE)
        throw new BadRequestException('Email is taken');

      throw new InternalServerErrorException(error.messsage);
    }
  }

  async updateUser(id: string, updateData: UpdateUserDto) {
    try {
      const foundUser = await this.findById(+id);

      Object.assign(foundUser, updateData);
      //This is the same as
      //foundUser.firstName = updateData.firstName
      //foundUser.lastName = updateData.lastName

      await this.usersRepo.save(foundUser);
    } catch (error) {
      if (error.code === DUPLICATE_PG_CODE)
        throw new BadRequestException('Email is taken');

      throw new InternalServerErrorException(error.messsage);
    }
  }

  async deleteUser(id: string) {
    const foundUser = await this.findById(+id);

    await this.usersRepo.remove(foundUser);
  }
}
