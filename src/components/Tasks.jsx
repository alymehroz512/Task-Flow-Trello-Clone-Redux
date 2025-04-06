import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, updateTaskStatus } from '../redux/tasksSlice';
import { useState, useEffect } from 'react';
// useSelector is a React-Redux hook that lets your component read data from the Redux store.
const Tasks = ({ boardName, folderName }) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.users.username);
  const tasks = useSelector(
    (state) => state.tasks[username]?.[boardName]?.[folderName] || []
  );

  const [formVisible, setFormVisible] = useState(false);
  const [notification, setNotification] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const description = e.target.description.value.trim();
    const date = e.target.date.value;

    if (!name || !description || !date) {
      setNotification('Please fill all fields.');
      return;
    }

    dispatch(addTask({ username, boardName, folderName, task: { name, description, date } }));
    e.target.reset();
    setFormVisible(false);
    setSuccessMessage(`Task created in folder ${folderName} board ${boardName} successfully.`);
  };

  const handleStatusChange = (index, status) => {
    dispatch(updateTaskStatus({ username, boardName, folderName, index, status }));
    setSuccessMessage(`Task marked as ${status} successfully.`);
  };

  const handleDeleteTask = (index) => {
    dispatch(deleteTask({ username, boardName, folderName, index }));
    setSuccessMessage(`Task deleted from folder ${folderName} board ${boardName} successfully.`);
  };

  useEffect(() => {
    if (notification || successMessage) {
      const timer = setTimeout(() => {
        setNotification('');
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, successMessage]);

  return (
    <div className="task-container">
      {/* 🔴 Error Notification */}
      {notification && <div className="custom-notification">{notification}</div>}

      {/* ✅ Success Notification */}
      {successMessage && <div className="custom-success">{successMessage}</div>}

      <button className="btn btn-sm btn-dark" onClick={() => setFormVisible((prev) => !prev)}>
        Add Task
      </button>

      {formVisible && (
        <div className="task-form-overlay">
          <form onSubmit={handleAddTask} className="task-form">
            <div className="form-floating mb-3">
              <input name="name" id="taskName" className="form-control" placeholder="Task name" />
              <label htmlFor="taskName">Task Name</label>
            </div>
            <div className="form-floating mb-3">
              <input name="description" id="taskDescription" className="form-control" placeholder="Task description" />
              <label htmlFor="taskDescription">Task Description</label>
            </div>
            <div className="form-floating mb-3">
              <input type="date" name="date" id="taskDate" className="form-control" />
              <label htmlFor="taskDate">Due Date</label>
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-sm btn-dark">Create Task</button>
              <button type="button" className="btn btn-sm btn-danger" onClick={() => setFormVisible(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {tasks.map((task, idx) => (
        <div
          key={idx}
          className="task-item"
          style={{
            borderLeftColor:
              task.status === 'pending' ? 'red' :
              task.status === 'active' ? 'blue' :
              task.status === 'completed' ? 'green' : '#ccc',
          }}
        >
          <strong>{task.name}</strong>
          <p>{task.description}</p>
          <small>{task.date}</small>
          <div className="mt-2">
            <button className="btn btn-sm btn-dark mx-1" onClick={() => handleStatusChange(idx, 'pending')}>Pending</button>
            <button className="btn btn-sm btn-dark mx-1" onClick={() => handleStatusChange(idx, 'active')}>Active</button>
            <button className="btn btn-sm btn-dark mx-1" onClick={() => handleStatusChange(idx, 'completed')}>Completed</button>
            <button
              className="btn btn-sm btn-dark mx-1"
              onClick={() => handleDeleteTask(idx)}
            >
              Delete Task
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
