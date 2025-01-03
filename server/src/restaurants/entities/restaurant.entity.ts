import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Media } from './media.entity';
import { MenuItem } from './menu-item.entity';

@Entity('restaurant')
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

  @Column({ default: null })
  contactPhone: string;

  @Column('time', { default: null })
  openingTime: string;

  @Column('time', { default: null })
  closingTime: string;

  @Column({ default: true })
  isActive: boolean;

  @Column('decimal', { precision: 3, scale: 2, default: 0 })
  averageRating: number;

  @Column('int', { default: 0 })
  totalReviews: number;

  @OneToMany(() => MenuItem, menuItem => menuItem.restaurant, { cascade: true })
  menuItems: MenuItem[];

  @OneToMany(() => Media, media => media.restaurant, { cascade: true })
  media: Media[];

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
