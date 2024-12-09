const Task = require('../models/Task');

const taskController = {
  getAll: (req, res) => {
    const userId = req.userId;

    Task.findAll(userId, (err, tasks) => {
      if (err) return res.status(500).json({ error: 'Error fetching tasks' });
      res.status(200).json(tasks);
    });
  },

  edit: (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    Task.update(id, title, description, status, (err) => {
      if (err) return res.status(500).json({ error: 'Error updating task' });
      res.status(200).json({ message: 'Task updated' });
    });
  },

  filterByStatus: (req, res) => {
    const userId = req.userId;
    const { status } = req.query;

    Task.filterByStatus(userId, status, (err, tasks) => {
      if (err) return res.status(500).json({ error: 'Error fetching tasks' });
      res.status(200).json(tasks);
    });
  },


  create: (req, res) => {
    const userId = req.userId;
    const { title, description, status } = req.body;

    Task.create(userId, title, description, status, (err) => {
      if (err) return res.status(500).json({ error: 'Error creating task' });
      res.status(201).json({ message: 'Task created' });
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    Task.update(id, title, description, status, (err) => {
      if (err) return res.status(500).json({ error: 'Error updating task' });
      res.status(200).json({ message: 'Task updated' });
    });
  },

  delete: (req, res) => {
    const { id } = req.params;

    Task.delete(id, (err) => {
      if (err) return res.status(500).json({ error: 'Error deleting task' });
      res.status(200).json({ message: 'Task deleted' });
    });
  }
};

module.exports = taskController;
