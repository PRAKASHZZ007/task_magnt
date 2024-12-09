const db = require('../db');

const Task = {
  findAll: (userId, callback) => {
    const query = `SELECT * FROM tasks WHERE user_id = ?`;
    db.all(query, [userId], callback);
  },

  create: (userId, title, description, status, callback) => {
    const query = `INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)`;
    db.run(query, [userId, title, description, status], callback);
  },

  update: (id, title, description, status, callback) => {
    const query = `UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?`;
    db.run(query, [title, description, status, id], callback);
  },

  filterByStatus: (userId, status, callback) => {
    const query = `SELECT * FROM tasks WHERE user_id = ? AND status = ?`;
    db.all(query, [userId, status], callback);
  },


  delete: (id, callback) => {
    const query = `DELETE FROM tasks WHERE id = ?`;
    db.run(query, [id], callback);
  }
};

module.exports = Task;
