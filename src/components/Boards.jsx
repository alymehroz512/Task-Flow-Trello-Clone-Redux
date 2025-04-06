import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { addBoard, deleteBoard } from '../redux/boardsSlice';
import Folders from './Folders';

const Boards = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.users);
  const boards = useSelector((state) => state.boards[username] || []);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddBoard = (e) => {
    e.preventDefault();
    const name = e.target.board.value.trim();

    if (!name) {
      setErrorMessage('Please enter board name.');
      return;
    }

    dispatch(addBoard({ username, name }));
    setSuccessMessage(`${name} board created successfully.`);
    e.target.reset();
  };

  const handleDeleteBoard = (boardName) => {
    dispatch(deleteBoard({ username, name: boardName }));
    setSuccessMessage(`${boardName} board deleted successfully.`);
  };

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="container" style={{ padding: '1rem' }}>
      {/* ✅ Notifications */}
      {errorMessage && <div className="custom-error">{errorMessage}</div>}
      {successMessage && <div className="custom-success">{successMessage}</div>}

      {/* Add Board Form */}
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
              onClick={() => handleDeleteBoard(board)}
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
