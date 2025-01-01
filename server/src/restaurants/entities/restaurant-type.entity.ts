import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('restaurant_types')
export class RestaurantType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;
}