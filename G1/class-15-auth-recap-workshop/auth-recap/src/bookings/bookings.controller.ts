import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { Roles } from 'src/roles/roles.decorator';
import { RoleType } from 'src/roles/roles.model';
import { RolesGuard } from 'src/roles/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Roles([RoleType.USER, RoleType.ADMIN])
  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Roles([RoleType.USER, RoleType.ADMIN])
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookingsService.findOne(id);
  }

  @Roles([RoleType.ADMIN])
  @Post()
  create(@Body() createBookingDto: CreateBookingDto, @Req() req: Request) {
    const user = req['user'] as User;

    console.log(user);

    return this.bookingsService.create(user.id, createBookingDto);
  }

  @Roles([RoleType.ADMIN])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(+id, updateBookingDto);
  }

  @Roles([RoleType.ADMIN])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }
}
