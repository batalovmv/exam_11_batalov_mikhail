import { DataSource } from 'typeorm';
import { Category } from './entities/category.entity';
import { Item } from './entities/contentItem.entity';
import { Location } from './entities/news.entity';
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Abc11223344',
  database: 'test',
  entities: [Category, Item, Location],
  synchronize: true
});