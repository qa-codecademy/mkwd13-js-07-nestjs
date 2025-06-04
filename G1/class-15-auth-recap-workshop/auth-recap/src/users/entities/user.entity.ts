import { Exclude } from 'class-transformer';
import { Booking } from 'src/bookings/entities/booking.entity';
import { RoleType } from 'src/roles/roles.model';
import {
  ChangeStreamRefineCollectionShardKeyDocument,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    name: 'email',
  })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column('text', {
    array: true,
    default: [RoleType.USER],
  })
  roles: RoleType[];

  @Column({
    name: 'first_name',
  })
  firstName: string;

  @Column({
    name: 'last_name',
  })
  lastName: string;

  @Column({ type: 'int' })
  age: number;

  // @Exclude()
  // @Column('text', {
  //   array: true,
  //   default: [],
  //   nullable: true,
  // })
  // refreshTokens: string[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
