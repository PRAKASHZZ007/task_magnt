const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = 'your_secret_key';

const authController = {
  register: (req, res) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ error: 'Hashing failed' });

      User.create(username, hash, (err) => {
        if (err) return res.status(400).json({ error: 'User already exists' });
        res.status(201).json({ message: 'User registered' });
      });
    });
  },

  login: (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, user) => {
      if (err || !user) return res.status(401).json({ error: 'Invalid credentials' });

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
      });
    });
  }
};

module.exports = authController;
