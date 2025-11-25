const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { createUser, getUserByUsername } = require('../models/userModel');

async function register(req, res, next) {
  const { username, password, role } = req.body;
  try {
    const existing = await getUserByUsername(username);
    if (existing) return res.status(400).json({ message: 'User exists' });
    const hash = await bcrypt.hash(password, 10);
    const id = await createUser(username, hash, role);
    res.status(201).json({ id, username });
  } catch (err) { next(err); }
}

async function login(req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
    res.json({ token });
  } catch (err) { next(err); }
}

module.exports = { register, login };
