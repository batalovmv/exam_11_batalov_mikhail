import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { CommentEnt } from './comment.entity';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image!: string|null;

  @CreateDateColumn()
  date!: Date;

  @OneToMany(() => CommentEnt, (comment) => comment.news)
  comments!: CommentEnt[];
}