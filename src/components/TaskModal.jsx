// // src/components/TaskModal.jsx
// const TaskModal = ({ onClose, onSubmit }) => {
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       const name = e.target.name.value.trim();
//       const description = e.target.description.value.trim();
//       const date = e.target.date.value;
  
//       if (!name || !description || !date) {
//         return alert('Please fill all fields.');
//       }
  
//       onSubmit({ name, description, date });
//       onClose();
//     };
  
//     return (
//       <div style={{
//         position: 'fixed', top: 0, left: 0, width: '100%',
//         height: '100%', background: 'rgba(0,0,0,0.4)',
//         display: 'flex', alignItems: 'center', justifyContent: 'center'
//       }}>
//         <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px' }}>
//           <h3>Create Task</h3>
//           <form onSubmit={handleSubmit}>
//             <input name="name" placeholder="Task name" />
//             <input name="description" placeholder="Task description" />
//             <input type="date" name="date" />
//             <button type="submit">Add</button>
//             <button type="button" onClick={onClose}>Cancel</button>
//           </form>
//         </div>
//       </div>
//     );
//   };
  
//   export default TaskModal;
  