import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Post } from './item.entity';



@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column({ nullable: true })
  image!: string;

  @Column({ type: 'date' })
  publishedAt!: Date;

  @OneToMany(() => Post, post => post.news)
  posts!: Post[];
}

