import { CommentEnt } from '../entities/comment.entity';
import { AppDataSource } from '../data-source';

export const CommentEntRepository = AppDataSource.getRepository(CommentEnt);