require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD,
  port: 5432,
});

app.get('/todos', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM todos;');
  res.json(rows);
});

app.post('/todos', async (req, res) => {
  const { title } = req.body;
  const { rows } = await pool.query('INSERT INTO todos (title) VALUES ($1) RETURNING *;', [title]);
  res.json(rows[0]);
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const { rows } = await pool.query('UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *;', [completed, id]);
  res.json(rows[0]);
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM todos WHERE id = $1;', [id]);
  res.sendStatus(204);
});

app.listen(process.env.WEBPORT, () => {
  console.log(`Server listening on port ${process.env.WEBPORT}`);
});
