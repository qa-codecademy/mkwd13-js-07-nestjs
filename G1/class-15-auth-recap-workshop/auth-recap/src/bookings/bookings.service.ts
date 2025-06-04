import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private bookingsRepo: Repository<Booking>,
  ) {}

  findAll() {
    return this.bookingsRepo.find({ loadRelationIds: true });
  }

  async findOne(id: number) {
    const foundBooking = await this.bookingsRepo.findOne({
      where: { id },
      loadRelationIds: true,
    });

    if (!foundBooking) throw new NotFoundException('Booking not found');

    return foundBooking;
  }

  create(userId: number, createBookingDto: CreateBookingDto) {
    const newBooking = this.bookingsRepo.create({
      ...createBookingDto,
      user: { id: userId },
    });

    return this.bookingsRepo.save(newBooking);
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.findOne(id);

    Object.assign(booking, updateBookingDto);

    return this.bookingsRepo.save(booking);
  }

  async remove(id: number) {
    const booking = await this.findOne(id);

    return this.bookingsRepo.remove(booking);
  }
}
