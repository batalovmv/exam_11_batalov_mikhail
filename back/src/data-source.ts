import { DataSource } from 'typeorm';

import { News } from './entities/news.entity';
import { CommentEnt } from './entities/comment.entity';
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Abc11223344',
  database: 'test',
  entities: [News, CommentEnt],
  synchronize: true
});