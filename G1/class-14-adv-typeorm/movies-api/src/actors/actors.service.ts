import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActorsService {
  constructor(@InjectRepository(Actor) private actorRepo: Repository<Actor>) {}

  create(createActorDto: CreateActorDto) {
    return 'This action adds a new actor';
  }

  findAll() {
    return this.actorRepo.find({});
  }

  async findOne(id: number) {
    // const foundActor = this.actorRepo.findOne({ where: { id } });
    try {
      const foundActor = await this.actorRepo.findOneOrFail({ where: { id } });

      return foundActor;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Actor not found');
    }
  }

  update(id: number, updateActorDto: UpdateActorDto) {
    return `This action updates a #${id} actor`;
  }

  remove(id: number) {
    return `This action removes a #${id} actor`;
  }
}
