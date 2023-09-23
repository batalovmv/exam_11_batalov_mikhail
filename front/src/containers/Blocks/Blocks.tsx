
import { useEffect, useState } from 'react';
import { removeMessage } from '../../features/blocksSlice';
import { deleteMessage } from '../../features/blocksSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchMessages, sendMessage } from '../../features/blocksSlice';
import { IMessages } from '../../interfaces/IBlock';


export default function MessageBoard() {
  const [image, setImage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { messages} = useAppSelector((state) => state.blocks);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = event.currentTarget.author.value || 'Anonymous';
    const content = event.currentTarget.message.value;
    dispatch(sendMessage({ title, content, image })); // image здесь - это строка Base64
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const file = event.currentTarget.files[0];
      const reader = new FileReader();

      reader.onloadend = function () {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      }

      if (file) {
        reader.readAsDataURL(file);
      } else {
        setImage(null);
      }
    }
  };
  const handleUrlUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.currentTarget.value);
  };

  const remMessage = (id:string)=>{
    dispatch(removeMessage(id));// из базы данных
    dispatch(deleteMessage(id)) // из локальной части на экране
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label className='input'>
          Author:
          <input type="text" name="author" />
        </label>
        <label className='input'>
          Message:
          <input type="text" name="message" required />
        </label>
        <label className='input'>
          Image :
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <input type="text" placeholder="Or enter image URL" onChange={handleUrlUpload} />
          {image && <img className='imgPrev' src={image} alt="Uploaded" />}
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>
        {messages.map((message:IMessages) => (
          <div className="message" key={message.id} >
            <h4>{message.title}</h4>
            <p>{message.content}</p>
            {message.image && <img src={message.image} alt="" />}
            
            <button className="delete-button" onClick={() => (remMessage(message.id as string))
            }>X</button>
            
          </div>
        ))}
      </div>
    </div>
  );
}