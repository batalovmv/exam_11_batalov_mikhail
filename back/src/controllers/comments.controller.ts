import { CommentEntRepository } from '../repositories/coment.repository';
import { CommentEnt } from '../entities/comment.entity';
import { Body, Post, Get, JsonController,  QueryParams, Param, Delete, Put } from 'routing-controllers';
import { Router } from 'express';
@JsonController('/comments')
export class CommentEntController  {
  constructor(private router: Router) { }

  @Get()
  async getAll() {
    try {
      const items = await CommentEntRepository.find();
      return items.map(location => ({ id: location.id, name: location.news })); // Отдаем только ID и название предмета
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
      return item; // Отдаем один объект со всеми полями
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post()
  async create(@Body() itemData: CommentEnt) {
    try {
      const newItem = CommentEntRepository.create(itemData);
      await CommentEntRepository.save(newItem);
      return newItem; // Отдаем один объект со всеми полями, включая ID выданный базой данных
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


