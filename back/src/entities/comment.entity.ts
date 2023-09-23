import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { News } from './news.entity';

@Entity()
export class CommentEnt {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => News, (news) => news.comments)
  news!: News;

  @Column({ default: "Anonymous" })
  author!: string;

  @Column()
  comment!: string;
}