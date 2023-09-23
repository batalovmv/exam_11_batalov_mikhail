import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ContentItem } from './contentItem.entity';



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

  @OneToMany(() => ContentItem, ContentItem => ContentItem.news)
  ContentItems!: ContentItem[];
}

