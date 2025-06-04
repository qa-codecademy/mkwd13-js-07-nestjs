import { Injectable } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from './entities/director.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DirectorsService {
  constructor(
    @InjectRepository(Director) private directorsRepo: Repository<Director>,
  ) {}

  create(createDirectorDto: CreateDirectorDto) {
    return 'This action adds a new director';
  }

  findAll() {
    // return this.directorsRepo.find({
    //   relations: {
    //     movies: true,
    //   },
    // });

    const builderExample = this.directorsRepo
      .createQueryBuilder('director')
      // .select('*')
      // .leftJoinAndSelect('director.movies', 'movie')
      .select('director.firstName')
      .addSelect('director.lastName')
      .where('director.id = :directorId', { directorId: 2 })
      .andWhere('director.firstName = :firstName', { firstName: 'Martin' })
      .getRawMany();

    return builderExample;
  }

  findOne(id: number) {
    return `This action returns a #${id} director`;
  }

  update(id: number, updateDirectorDto: UpdateDirectorDto) {
    return `This action updates a #${id} director`;
  }

  remove(id: number) {
    return `This action removes a #${id} director`;
  }
}
