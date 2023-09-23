import { CommentEntRepository } from '../repositories/coment.repository';
import { CommentEnt } from '../entities/comment.entity';
import { Body, Post, Get, JsonController,  QueryParams, Param, Delete, Put } from 'routing-controllers';
import { Router } from 'express';
import { getRepository } from 'typeorm';
import { NewsRepository } from '../repositories/news.repository';
interface CommentData {
  newsId: number;
  author: string;
  comment: string;
}

@JsonController('/comments')
export class CommentEntController  {
  constructor(private router: Router) { }

  @Get()
  async getAll() {
    try {
      const items = await CommentEntRepository.find();
      return items.map(location => ({ id: location.id, name: location.news })); 
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get('/:id')
  async getOne(@Param('id') itemId: number) {
    try {
      const item = await CommentEntRepository.findOne({ where: { id: itemId } });
      if (!item) {
        throw new Error('Item not found');
      }
      return item;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post()
  async create(@Body() itemData: CommentData) {
    try {
      
      const { newsId, ...commentData } = itemData;

     
      const newsItem = await NewsRepository.findOne({ where: { id: newsId }});
      if (!newsItem) {
        throw new Error('News item not found');
      }

      
      const newItem = CommentEntRepository.create({
        ...commentData,
        news: newsItem, 
      });

      await CommentEntRepository.save(newItem);
      return newItem; 
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Delete('/:id')
  async delete(@Param('id') itemId: number) {
    try {
      // Здесь вы можете добавить код для проверки наличия связанных ресурсов
      const item = await CommentEntRepository.findOne({ where: { id: itemId }, relations: ['items'] });
      if (!item) {
        throw new Error('Item not found');
      }
     

      await CommentEntRepository.remove(item); // Удаляем ресурс
      return { message: 'Item deleted' };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Put('/:id')
  async update(@Param('id') itemId: number, @Body() itemData: CommentEnt) {
    try {
      let item = await CommentEntRepository.findOne({ where: { id: itemId } });
      if (!item) {
        throw new Error('Item not found');
      }
      item = CommentEntRepository.merge(item, itemData);
      await CommentEntRepository.save(item); // Обновляем ресурс
      return item; // Отдаем один объект со всеми полями, включая ID
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}


