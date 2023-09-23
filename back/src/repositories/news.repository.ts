import { AppDataSource } from '../data-source';
import { News } from '../entities/news.entity';

export const NewsRepository = AppDataSource.getRepository(News);