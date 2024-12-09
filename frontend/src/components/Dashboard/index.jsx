import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../../api';
import './index.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'To Do' });
  const [filter, setFilter] = useState('All'); // State for filtering tasks
  const [isEditing, setIsEditing] = useState(false); // State for tracking edit mode
  const [editTaskId, setEditTaskId] = useState(null); // State to store task being edited

  const fetchAllTasks = async () => {
    const { data } = await fetchTasks();
    setTasks(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing task
      await updateTask(editTaskId, formData);
      setIsEditing(false);
      setEditTaskId(null);
    } else {
      // Create new task
      await createTask(formData);
    }
    fetchAllTasks();
    setFormData({ title: '', description: '', status: 'To Do' });
  };

  const handleEdit = (task) => {
    setIsEditing(true);
    setEditTaskId(task.id);
    setFormData({ title: task.title, description: task.description, status: task.status });
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchAllTasks();
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  return (
    <div className="dashboard">
      <h2>Task Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        ></textarea>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
      </form>

      {/* Filter Dropdown */}
      <div className="filter">
        <label htmlFor="filter">Filter by Status: </label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Task List */}
      <div className="task-list">
        {filteredTasks.map((task) => (
          <div key={task.id} className="task-item">
            <h3 className='title'>{task.title}</h3>
            <p class="description">{task.description}</p>
            <small className='status'>{task.status}</small>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
