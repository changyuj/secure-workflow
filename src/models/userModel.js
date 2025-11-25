const pool = require('../config/db');

async function createUser(username, passwordHash, role='analyst') {
  const [res] = await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, passwordHash, role]);
  return res.insertId;
}

async function getUserByUsername(username) {
  const [rows] = await pool.query('SELECT * FROM users WHERE username=?', [username]);
  return rows[0];
}

module.exports = { createUser, getUserByUsername };
