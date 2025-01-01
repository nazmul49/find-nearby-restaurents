import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity('restaurant_photos')
export class RestaurantPhoto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  type: 'photo' | 'video';

  @Column({ nullable: true })
  caption: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.photos)
  restaurant: Restaurant;

  @Column()
  createdAt: Date;
}