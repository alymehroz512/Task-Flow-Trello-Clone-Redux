import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { addBoard, deleteBoard } from '../redux/boardsSlice';
import Folders from './Folders';

const Boards = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.users);
  const boards = useSelector((state) => state.boards[username] || []);
  const [notification, setNotification] = useState('');

  const handleAddBoard = (e) => {
    e.preventDefault();
    const name = e.target.board.value.trim();
    if (!name) {
      setNotification('Please enter board name.');
      return;
    }
    dispatch(addBoard({ username, name }));
    e.target.reset();
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="container" style={{ padding: '1rem' }}>
      {/* Notification */}
      {notification && <div className="custom-notification">{notification}</div>}

      {/* Add Board Form with Floating Input */}
      <form onSubmit={handleAddBoard}>
        <div className="form-floating mb-3">
          <input
            type="text"
            name="board"
            id="board"
            className="form-control"
            placeholder="Enter board name"
          />
          <label htmlFor="board">Board Name</label>
        </div>
        <button type="submit" className="btn btn-sm btn-dark">
          Add Board
        </button>
      </form>

      {/* Boards List */}
      {boards.map((board, idx) => (
        <div
          key={idx}
          style={{
            marginTop: '1rem',
            padding: '2.5rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '1.2rem',
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h3>{board}</h3>
            <button
              onClick={() => dispatch(deleteBoard({ username, name: board }))}
              className="btn btn-danger btn-sm"
            >
              Delete Board
            </button>
          </div>
          <Folders boardName={board} />
        </div>
      ))}
    </div>
  );
};

export default Boards;
