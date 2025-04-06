import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { addFolder, deleteFolder } from '../redux/foldersSlice';
import Tasks from './Tasks';

const Folders = ({ boardName }) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.users.username);
  const folders = useSelector((state) => state.folders[username]?.[boardName] || []);
  const [notification, setNotification] = useState('');

  const handleAddFolder = (e) => {
    e.preventDefault();
    const name = e.target.folder.value.trim();
    if (!name) {
      setNotification('Please enter folder name.');
      return;
    }
    dispatch(addFolder({ username, boardName, name }));
    e.target.reset();
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="container mt-4">
      {/* Notification */}
      {notification && <div className="custom-notification">{notification}</div>}

      {/* Floating Input for Folder Name */}
      <form onSubmit={handleAddFolder}>
        <div className="form-floating mb-3">
          <input
            type="text"
            name="folder"
            id="folder"
            className="form-control"
            placeholder="Enter folder name"
          />
          <label htmlFor="folder">Folder Name</label>
        </div>
        <button type="submit" className="btn btn-sm btn-dark">
          Add Folder
        </button>
      </form>

      {/* Folder List with Dark Grey Background */}
      {folders.map((folder, idx) => (
        <div
          key={idx}
          style={{
            marginTop: '1rem',
            padding: '2.5rem',
            backgroundColor: '#E5E4E2',
            color: '#000',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            borderRadius: '1rem',
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h4>{folder}</h4>
            <button
              onClick={() => dispatch(deleteFolder({ username, boardName, name: folder }))}
              className="btn btn-danger btn-sm"
            >
              Delete Folder
            </button>
          </div>
          <Tasks boardName={boardName} folderName={folder} />
        </div>
      ))}
    </div>
  );
};

export default Folders;
