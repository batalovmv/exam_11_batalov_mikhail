import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { News } from './news.entity';

@Entity()
export class ContentItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  newsId!: number;

  @Column({ default: 'Anonymous' })
  author!: string;

  @Column()
  comment!: string;

  @ManyToOne(() => News, news => news.ContentItems)
  news!: News;
}