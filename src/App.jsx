// src/App.jsx
import Navbar from './components/Navbar';
import Login from './components/Login';
import Boards from './components/Boards';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from './redux/usersSlice';
import { useEffect, useState, useRef } from 'react';

const App = () => {
  const username = useSelector((state) => state.users.username);
  const dispatch = useDispatch();

  const [success, setSuccess] = useState(null);
  const isFirstLoad = useRef(true); // Track if it's the first load

  // Show login success message (but not on first load)
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return; // Skip message on first load
    }

    if (username) {
      setSuccess(`${username} logged in successfully.`);
      setTimeout(() => setSuccess(null), 3000);
    }
  }, [username]);

  // Logout handler
  const handleLogout = () => {
    setSuccess(`${username} logged out successfully.`);
    dispatch(logoutUser());
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div>
      <Navbar />

      {/* Success message on login/logout */}
      {success && <div className="custom-success">{success}</div>}

      {username ? (
        <div style={{ padding: '1rem' }}>
          <div className="container mt-4 d-flex justify-content-between align-items-center">
            <h4>Welcome, {username}!</h4>
            <button className="btn btn-sm btn-dark" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <Boards />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
