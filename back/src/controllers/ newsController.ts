import { newsRepository } from '../repositories/news.repository';
import { Post } from '../entities/contentItem.entity';
import { Body, Post, Get, JsonController,  QueryParams, Param, Delete, Put } from 'routing-controllers';
import { Router } from 'express';
@JsonController('/location')
export class LocationController  {
  constructor(private router: Router) { }

  @Get()
  async getAll() {
    try {
      const items = await locationRepository.find();
      return items.map(location => ({ id: location.id, name: location.name })); // Отдаем только ID и название предмета
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get('/:id')
  async getOne(@Param('id') itemId: number) {
    try {
      const item = await locationRepository.findOne({ where: { id: itemId } });
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
  async create(@Body() itemData: Location) {
    try {
      const newItem = locationRepository.create(itemData);
      await locationRepository.save(newItem);
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
      const item = await locationRepository.findOne({ where: { id: itemId }, relations: ['items'] });
      if (!item) {
        throw new Error('Item not found');
      }
      if (item.items && item.items.length > 0) {
        throw new Error('Cannot delete location with associated items');
      }

      await locationRepository.remove(item); // Удаляем ресурс
      return { message: 'Item deleted' };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Put('/:id')
  async update(@Param('id') itemId: number, @Body() itemData: Location) {
    try {
      let item = await locationRepository.findOne({ where: { id: itemId } });
      if (!item) {
        throw new Error('Item not found');
      }
      item = locationRepository.merge(item, itemData);
      await locationRepository.save(item); // Обновляем ресурс
      return item; // Отдаем один объект со всеми полями, включая ID
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}


