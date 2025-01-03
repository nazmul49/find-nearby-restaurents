import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity('menu_item')
export class MenuItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  image: string;

  @Column({ default: true })
  isAvailable: boolean;

  @ManyToOne(() => Restaurant, restaurant => restaurant.menuItems, { onDelete: 'CASCADE' })
  restaurant: Restaurant;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
