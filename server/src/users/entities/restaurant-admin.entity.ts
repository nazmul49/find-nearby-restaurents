import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { User } from './user.entity';
import { Restaurant } from 'src/restaurants/entities';

@Entity('restaurant_admins')
export class RestaurantAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  // @ManyToOne(() => Restaurant, restaurant => restaurant.admins)
  // restaurant: Restaurant;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  createdAt: Date;
}