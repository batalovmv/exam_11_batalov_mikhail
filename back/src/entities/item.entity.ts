import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { News } from './location.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  newsId!: number;

  @Column({ default: 'Anonymous' })
  author!: string;

  @Column()
  comment!: string;

  @ManyToOne(() => News, news => news.comments)
  news: News;
}