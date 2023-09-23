import { Category } from '../entities/category.entity';
import { categoryRepository } from '../repositories/category.repository';
import { Body, JsonController, Get, Param, Post, QueryParam, QueryParams, Delete, Put } from 'routing-controllers';
import { Router } from 'express-serve-static-core';
interface QueryParams {
  artist?: number;
  album?: number;
}
@JsonController('/category')
export class CategoryController {
  constructor(private router: Router) { }

  @Get()
  async getAll() {
    try {
      const items = await categoryRepository.find();
      return items.map(category => ({ id: category.id, name: category.name })); // Отдаем только ID и название предмета
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get('/:id')
  async getOne(@Param('id') itemId: number) {
    try {
      const item = await categoryRepository.findOne({ where: { id: itemId } });
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
  async create(@Body() itemData: Category) {
    try {
      const newItem = categoryRepository.create(itemData);
      await categoryRepository.save(newItem);
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
      const item = await categoryRepository.findOne({ where: { id: itemId } });
      if (!item) {
        throw new Error('Item not found');
      }
      await categoryRepository.remove(item); // Удаляем ресурс
      return { message: 'Item deleted' };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Put('/:id')
  async update(@Param('id') itemId: number, @Body() itemData: Category) {
    try {
      let item = await categoryRepository.findOne({ where: { id: itemId } });
      if (!item) {
        throw new Error('Item not found');
      }
      item = categoryRepository.merge(item, itemData);
      await categoryRepository.save(item); // Обновляем ресурс
      return item; // Отдаем один объект со всеми полями, включая ID
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}