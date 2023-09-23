import { NewsRepository } from '../repositories/news.repository';
import { News } from '../entities/news.entity';
import { Get, Post, Body, JsonController, Put, Param, Delete, UploadedFile } from 'routing-controllers';
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
export class ItemController {

  @Get()
  async getAll() {
    try {
      const items = await NewsRepository.find();
      return items.map(item => ({ id: item.id, title: item.title ,content:item.content})); // Отдаем только ID и название предмета
    } catch (error) {
      console.error(error); 
      throw error;
    }
  }

  @Get('/:id')
  async getOne(@Param('id') itemId: number) {
    try {
      const item = await NewsRepository.findOne({ where: { id: itemId } });
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
  async create(
    @UploadedFile('photo', { options: upload }) file: any,
    @Body() itemData: News
  ) {
    try {
      if (!itemData.title) {
        throw new Error('Item title is required');
      }

      const newItem = NewsRepository.create({
        ...itemData,
        image: file ? `./uploads/${file.filename}` : null
      });

      await NewsRepository.save(newItem);

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
      const item = await NewsRepository.findOne({ where: { id: itemId } });
      if (!item) {
        throw new Error('Item not found');
      }
      
      await NewsRepository.remove(item); // Удаляем ресурс
      return { message: 'Item deleted' };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Put('/:id')
  async update(@Param('id') itemId: number, @Body() itemData: News) {
    try {
      let item = await NewsRepository.findOne({ where: { id: itemId } });
      if (!item) {
        throw new Error('Item not found');
      }
      item = NewsRepository.merge(item, itemData);
      await NewsRepository.save(item); // Обновляем ресурс
      return item; // Отдаем один объект со всеми полями, включая ID
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}