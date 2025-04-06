// src/App.jsx
import Navbar from './components/Navbar';
import Login from './components/Login';
import Boards from './components/Boards';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from './redux/usersSlice';

const App = () => {
  const username = useSelector((state) => state.users.username);
  const dispatch = useDispatch();

  return (
    <div>
      <Navbar />
      {username ? (
        <div style={{ padding: '1rem' }}>
          <div className="container mt-4 d-flex justify-content-between align-items-center">
            <h4>Welcome, {username}!</h4>
            <button className="btn btn-sm btn-dark" onClick={() => dispatch(logoutUser())}>Logout</button>
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
