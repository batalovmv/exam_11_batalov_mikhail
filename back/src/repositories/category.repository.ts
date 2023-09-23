import { AppDataSource } from '../data-source';
import { Category } from '../entities/category.entity';

export const categoryRepository = AppDataSource.getRepository(Category);