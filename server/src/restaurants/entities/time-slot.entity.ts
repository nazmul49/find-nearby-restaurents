import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity('time_slots')
export class TimeSlot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('time')
  startTime: string;

  @Column('time')
  endTime: string;

  @Column('int')
  availableSeats: number;

  // @ManyToOne(() => Restaurant, restaurant => restaurant.timeSlots)
  // restaurant: Restaurant;

  @Column()
  date: Date;
}