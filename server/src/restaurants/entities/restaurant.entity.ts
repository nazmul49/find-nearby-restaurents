import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { MenuItem } from './menu-item.entity';
import { Review } from './review.entity';
import { RestaurantType } from './restaurant-type.entity';
import { AmbienceTag } from './ambience-tag.entity';
import { RestaurantPhoto } from './restaurant-photo.entity';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  branchName: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 8 })
  latitude: number;

  @Column('decimal', { precision: 11, scale: 8 })
  longitude: number;

  @Column({ nullable: true })
  googleMapUrl: string;

  @Column()
  contactPhone: string;

  @Column('time')
  openingTime: string;

  @Column('time')
  closingTime: string;

  @Column({ default: true })
  isActive: boolean;

  @Column('decimal', { precision: 3, scale: 2, default: 0 })
  averageRating: number;

  @Column('int', { default: 0 })
  totalReviews: number;

  @ManyToMany(() => RestaurantType)
  @JoinTable()
  types: RestaurantType[];

  @ManyToMany(() => AmbienceTag)
  @JoinTable()
  ambienceTags: AmbienceTag[];

  @OneToMany(() => MenuItem, menuItem => menuItem.restaurant)
  menuItems: MenuItem[];

  @OneToMany(() => Review, review => review.restaurant)
  reviews: Review[];

  @OneToMany(() => RestaurantPhoto, photo => photo.restaurant)
  photos: RestaurantPhoto[];

  // @Column({ type: 'json', nullable: true })
  // seoMetadata: {
  //   metaTitle: string;
  //   metaDescription: string;
  //   metaTags: string[];
  // };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}