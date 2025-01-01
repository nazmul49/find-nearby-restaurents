import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ambience_tags')
export class AmbienceTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;
}