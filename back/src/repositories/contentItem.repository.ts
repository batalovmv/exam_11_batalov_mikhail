import { AppDataSource } from '../data-source';
import { ContentItem } from '../entities/contentItem.entity';

export const contentItemRepository = AppDataSource.getRepository(ContentItem);