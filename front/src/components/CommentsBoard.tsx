import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchComments } from '../features/blocksSlice';
import './CommentsBoard.css'; 
import { createComment, deleteComment } from '../features/blocksSlice';

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

  const handleSubmitComment = (e) => {
    e.preventDefault();
    const comment = e.target.elements.comment.value;
    dispatch(createComment({ newsId, comment }));//Недоделано, не работает
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment({ newsId, commentId }));//Недоделано, не работает запрос
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="comments-board">
      <form onSubmit={handleSubmitComment}>
        <input type="text" name="comment" placeholder="Add a comment..." />
        <button type="submit">Submit Comment</button>
      </form>

      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p className="comment-text">{comment.comment}</p>
            <p className="comment-author">By: {comment.author}</p>
            <button onClick={() => handleDeleteComment(comment.id)}>Delete Comment</button>
          </div>
        ))
      )}
    </div>
  );
}