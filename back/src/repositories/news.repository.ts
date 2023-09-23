import { News } from '../entities/news.entity';
import { AppDataSource } from '../data-source';

export const newsRepository = AppDataSource.getRepository(News);