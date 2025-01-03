import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { MenuItem } from './menu-item.entity';

@Entity('Media')
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ['photo', 'video'] })
  type: 'photo' | 'video';

  @Column()
  url: string;

  @Column({ nullable: true })
  caption: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.media, { onDelete: 'CASCADE', nullable: true })
  restaurant: Restaurant;

  @Column()
  createdAt: Date;
}
