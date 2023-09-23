import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchComments } from '../features/blocksSlice';
import './CommentsBoard.css'; 

export default function CommentsBoard() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.blocks);
  const data = useAppSelector((state) => state.blocks);
  const comments = data.comments;
  const { newsId } = useParams()

  useEffect(() => {
    if (newsId) {
      dispatch(fetchComments(parseInt(newsId)));
    }
  }, [dispatch, newsId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="comments-board">
      
    
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p className="comment-text">{comment.comment}</p>
            <p className="comment-author">By: {comment.author}</p>
          </div>
        ))
      )}
    </div>
  );
}