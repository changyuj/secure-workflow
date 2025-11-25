const pool = require('../config/db');

async function createWorkflow({ title, owner, status, steps }) {
  const [res] = await pool.query('INSERT INTO workflows (title, owner, status, steps) VALUES (?, ?, ?, ?)', [title, owner, status, JSON.stringify(steps)]);
  return res.insertId;
}

async function getWorkflows() {
  const [rows] = await pool.query('SELECT * FROM workflows');
  rows.forEach(r => r.steps = JSON.parse(r.steps || '[]'));
  return rows;
}

async function getWorkflowById(id) {
  const [rows] = await pool.query('SELECT * FROM workflows WHERE id=?', [id]);
  if (!rows[0]) return null;
  rows[0].steps = JSON.parse(rows[0].steps || '[]');
  return rows[0];
}

async function updateWorkflow(id, payload) {
  const { title, owner, status, steps } = payload;
  await pool.query('UPDATE workflows SET title=?, owner=?, status=?, steps=? WHERE id=?', [title, owner, status, JSON.stringify(steps), id]);
  return getWorkflowById(id);
}

module.exports = { createWorkflow, getWorkflows, getWorkflowById, updateWorkflow };
