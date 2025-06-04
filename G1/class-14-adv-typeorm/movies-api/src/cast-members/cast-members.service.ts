import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCastMemberDto } from './dto/create-cast-member.dto';
import { UpdateCastMemberDto } from './dto/update-cast-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CastMember } from './entities/cast-member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CastMembersService {
  constructor(
    @InjectRepository(CastMember)
    private castMemmbersRepo: Repository<CastMember>,
  ) {}

  create(createCastMemberDto: CreateCastMemberDto) {
    try {
      const newCastMember = this.castMemmbersRepo.create(createCastMemberDto);

      // return this.castMemmbersRepo.save(newCastMember);

      return this.castMemmbersRepo.insert(newCastMember);
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Couldn't create cast member");
    }
  }

  findAll() {
    return `This action returns all castMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} castMember`;
  }

  update(id: number, updateCastMemberDto: UpdateCastMemberDto) {
    return `This action updates a #${id} castMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} castMember`;
  }
}
