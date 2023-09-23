import { NewsRepository } from '../repositories/news.repository';
import { News } from '../entities/news.entity';
import { Get, Post, Body, JsonController, Put, Param, Delete, UploadedFile } from 'routing-controllers';
import { Router } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

@JsonController('/news')
export class NewsController {

  @Get()
  async getAll() {
    try {
      const newsItems = await NewsRepository.find();
      return newsItems.map(item => ({ id: item.id, title: item.title })); // Возвращаем только ID и заголовок новостей
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get('/:id')
  async getOne(@Param('id') newsId: number) {
    try {
      const newsItem = await NewsRepository.findOne({ where: { id: newsId } });
      if (!newsItem) {
        throw new Error('News not found');
      }
      return newsItem; // Возвращаем один объект со всеми полями
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post()
  async create(@Body() newsData: News) {
    try {
      const newNews = NewsRepository.create(newsData);
      await NewsRepository.save(newNews);
      return newNews; // Возвращаем один объект со всеми полями, включая ID выданный базой данных
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Delete('/:id')
  async delete(@Param('id') newsId: number) {
    try {
      const newsItem = await NewsRepository.findOne({ where: { id: newsId } });
      if (!newsItem) {
        throw new Error('News not found');
      }
      await NewsRepository.remove(newsItem); // Удаляем новость
      return { message: 'News deleted' };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}