import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

import cors from "cors";
interface IMessage {
  id: string,
  author: string,
  message: string,
  image?: string
}

let messages: IMessage[] = [];

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));//без лимита картинки не загружались

app.get('/messages', (req: Request, res: Response) => {
  res.json(messages);
});

app.post('/messages', (req: Request, res: Response) => {
  const { author, message, image } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  let newMessage: IMessage = {
    id: uuidv4(),
    author: author || 'Anonymous',
    message: message,
    image: image || null
  };

  messages.push(newMessage);
  res.json(newMessage);
});

app.delete('/messages/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const index = messages.findIndex((message) => message.id === id);

  if (index !== -1) {
    messages.splice(index, 1);
    res.json({ message: "Message deleted successfully" });
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
