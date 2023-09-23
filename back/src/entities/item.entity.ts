import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Category } from './category.entity';
import { Location } from './location.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Category, (category) => category.id)
  category!: Category;

  @ManyToOne(() => Location, (location) => location.id)
  location!: Location;

  

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ type: 'text', nullable: true })
  photo!: string | null;

  
}