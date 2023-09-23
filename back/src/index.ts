import { useExpressServer } from 'routing-controllers';
import express from 'express';
import { AppDataSource } from './data-source';
import { LocationController } from './controllers/ newsController';
import { CategoryController } from './controllers/categoryController';
import { ItemController } from './controllers/contentItem.controller';
import { UploadController } from './controllers/uploadController';
import multer from 'multer';

const app = express();
const upload = multer();

AppDataSource.initialize().then(async () => {
  useExpressServer(app, {
    classTransformer: true,
    validation: true,
    controllers: [LocationController, CategoryController, ItemController, UploadController],
    middlewares: [upload.any()]  // добавляем multer как middleware
  });

  app.all('*', (req, res) => {
    res.status(404).json({ message: 'Route Not Found' });
  });

  app.listen(3006);
});