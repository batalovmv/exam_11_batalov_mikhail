import { useExpressServer } from 'routing-controllers';
import express from 'express';
import { AppDataSource } from './data-source';
import { CommentEntController } from './controllers/comments.controller';
import { ItemController } from './controllers/news.controller';
import { UploadController } from './controllers/uploadController';
import multer from 'multer';
import cors from 'cors';
const app = express();
app.use(cors());
const upload = multer();

AppDataSource.initialize().then(async () => {
  useExpressServer(app, {
    classTransformer: true,
    validation: true,
    controllers: [CommentEntController, ItemController, UploadController],
    middlewares: [upload.any()]  
  });

  app.all('*', (req, res) => {
    res.status(404).json({ message: 'Route Not Found' });
  });

  app.listen(3100);
});