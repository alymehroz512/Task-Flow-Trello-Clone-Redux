import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { addFolder, deleteFolder } from '../redux/foldersSlice';
import Tasks from './Tasks';

const Folders = ({ boardName }) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.users.username);
  const folders = useSelector((state) => state.folders[username]?.[boardName] || []);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddFolder = (e) => {
    e.preventDefault();
    const name = e.target.folder.value.trim();

    if (!name) {
      setErrorMessage('Please enter folder name.');
      return;
    }

    dispatch(addFolder({ username, boardName, name }));
    setSuccessMessage(`${name} folder created in ${boardName} board successfully.`);
    e.target.reset();
  };

  const handleDeleteFolder = (folderName) => {
    dispatch(deleteFolder({ username, boardName, name: folderName }));
    setSuccessMessage(`${folderName} folder deleted from ${boardName} board successfully.`);
  };

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  return (
    <div className="container mt-4">
      {/* ✅ Error Notification */}
      {errorMessage && <div className="custom-error">{errorMessage}</div>}

      {/* ✅ Success Notification */}
      {successMessage && <div className="custom-success">{successMessage}</div>}

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
              onClick={() => handleDeleteFolder(folder)}
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
