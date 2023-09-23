import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchComments, fetchMessageById } from '../features/blocksSlice';
import { IMessages } from '../interfaces/IBlock';
export default function CommentsBoard() {
  const { messageId } = useParams<{ messageId: string }>();
  const dispatch = useAppDispatch();

  const { comments } = useAppSelector((state) => state.blocks);
  const [message, setMessage] = useState<IMessages | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await dispatch(fetchMessageById(messageId!));
      setMessage(response.payload);
    }

    fetchMessage();

    const messageIdNumber = Number(messageId);
    if (!isNaN(messageIdNumber)) {
      dispatch(fetchComments(messageIdNumber));
    }
  }, [dispatch, messageId]);

  return (
    <div className="container">
      {message && (
        <>
          <h1>{message.title}</h1>
          <p>{message.content}</p>
          {message.image && <img src={message.image} alt="" />}
        </>
      )}

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <h2>{comment.author}</h2>
            <p>{comment.comment}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}