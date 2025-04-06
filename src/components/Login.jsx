import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/usersSlice';
import LoginImage from '../images/login-image.svg';
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
  const [success, setSuccess] = useState(null); // ✅ Success notification state

  const handleLogin = (e) => {
    e.preventDefault();
    const input = e.target.username.value.trim();

    if (!input) {
      setAlert('Please enter username first.');
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    const nameParts = input.split(' ');
    if (nameParts.length < 2) {
      setAlert('Please enter both first and last name.');
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    const capitalizedInput = nameParts
      .map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
      .join(' ');

    if (!staticUsers.some(user => user.toLowerCase() === capitalizedInput.toLowerCase())) {
      setAlert('Please check username.');
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    // ✅ Dispatch user and show success notification
    dispatch(setUser(capitalizedInput));
    setSuccess(`${capitalizedInput} logged in successfully.`);
    setTimeout(() => setSuccess(null), 3000);

    // Clear input field
    e.target.username.value = '';
  };

  return (
    <div className="container login-wrapper mt-5 mb-5 bg-light rounded-4 d-flex align-items-center shadow">
      {/* ✅ Separate alert and success notification divs */}
      {alert && <div className="custom-notification">{alert}</div>}
      {success && <div className="custom-success">{success}</div>}

      <div className="row w-100 p-5">
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img
            src={LoginImage}
            alt="Login Visual"
            className="img-fluid login-image"
          />
        </div>

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
