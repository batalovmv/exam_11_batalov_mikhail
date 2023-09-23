import  { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchComments } from '../features/blocksSlice';

export default function CommentsBoard() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.blocks);
  const comments = useAppSelector((state) => state.blocks.comments);
  const { newsId } = useParams()

  useEffect(() => {// так и не смог найти почему в этом месте все ломается
    if (newsId) {
      dispatch(fetchComments(parseInt(newsId)));
    }
  }, [dispatch, newsId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
console.log(Array.isArray(comments)); // выведет true, если comments — это массив
console.log(comments); // выведет текущее значение comments
  return (
    <div>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.comment}</p>
          <p>By: {comment.author}</p>
        </div>
      ))}
    </div>
  );
}