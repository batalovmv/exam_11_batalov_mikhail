import { contentItemRepository } from '../repositories/contentItem.repository';
import { ContentItem } from '../entities/contentItem.entity';
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


@JsonController('/items')
export class ItemController {

  @Get()
  async getAll() {
    try {
      const items = await contentItemRepository.find();
      return items.map(item => ({ id: item.id, name: item.name })); // Отдаем только ID и название предмета
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get('/:id')
  async getOne(@Param('id') itemId: number) {
    try {
      const item = await contentItemRepository.findOne({ where: { id: itemId } });
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
    @Body() itemData: ContentItem
  ) {
    try {
      if (!itemData.name) {
        throw new Error('Item name is required');
      }

      const newItem = contentItemRepository.create({
        ...itemData,
        photo: file ? `./uploads/${file.filename}` : null
      });

      await contentItemRepository.save(newItem);

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
      const item = await contentItemRepository.findOne({ where: { id: itemId } });
      if (!item) {
        throw new Error('Item not found');
      }
      if (item.category||item.location) {
        throw new Error('Cannot delete item that is associated with a category or location');
      }
      await contentItemRepository.remove(item); // Удаляем ресурс
      return { message: 'Item deleted' };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Put('/:id')
  async update(@Param('id') itemId: number, @Body() itemData: ContentItem) {
    try {
      let item = await contentItemRepository.findOne({ where: { id: itemId } });
      if (!item) {
        throw new Error('Item not found');
      }
      item = contentItemRepository.merge(item, itemData);
      await contentItemRepository.save(item); // Обновляем ресурс
      return item; // Отдаем один объект со всеми полями, включая ID
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}