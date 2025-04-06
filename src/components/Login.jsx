// src/components/Login.jsx
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/usersSlice';
import LoginImage from '../images/login-image.svg'; // Placeholder for the image
import { useState } from 'react';

const staticUsers = [
  'Ali Mehroz',
  'Saboor Malik',
  'Hassan Shaigan',
  'Ali Rooshan',
  'Mustehsan Ali',
];

const Login = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.users.username);

  const [alert, setAlert] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const input = e.target.username.value.trim();

    // Validate input: Ensure both first and last names are provided
    if (!input) {
      setAlert('Please enter username first.');
      setTimeout(() => setAlert(null), 3000); // Hide alert after 3 seconds
      return;
    }

    // Split the input into first and last name
    const nameParts = input.split(' ');
    
    // Check if both first and last names are entered
    if (nameParts.length < 2) {
      setAlert('Please enter both first and last name.');
      setTimeout(() => setAlert(null), 3000); // Hide alert after 3 seconds
      return;
    }

    // Capitalize the first letter of each part of the name
    const capitalizedInput = nameParts
      .map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
      .join(' ');

    // Check if the capitalized name matches any user in staticUsers
    if (!staticUsers.some(user => user.toLowerCase() === capitalizedInput.toLowerCase())) {
      setAlert('Please check username.');
      setTimeout(() => setAlert(null), 3000); // Hide alert after 3 seconds
      return;
    }

    // If everything is fine, dispatch the user
    dispatch(setUser(capitalizedInput));
  };

  return (
    <div className="container login-wrapper mt-5 mb-5 bg-light rounded-4 d-flex align-items-center shadow">
      {alert && <div className="custom-notification">{alert}</div>}
      
      <div className="row w-100 p-5">
        {/* Left Column (Image) */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img
            src={LoginImage}
            alt="Login Visual"
            className="img-fluid login-image"
          />
        </div>

        {/* Right Column (Form with VR Line) */}
        <div className="col-md-6 d-flex align-items-center justify-content-center border-start login-form-col">
          <div className="login-form-container w-75">
            <h2 className="mb-4 text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-floating mb-4">
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form-control"
                  placeholder="Enter username"
                />
                <label htmlFor="username">Username</label>
              </div>
              <button type="submit" className="btn btn-dark w-100">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
