import { AppDataSource } from '../data-source';
import { Item } from '../entities/item.entity';

export const itemRepository = AppDataSource.getRepository(Item);