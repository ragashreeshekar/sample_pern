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

app.post('/signup', async (req, res) => {
  const { name, phone, email, pwd } = req.body;
  console.log(name, phone, email, pwd)
  const { rows } = await pool.query('INSERT INTO users (name, phone, email, pwd) VALUES ($1, $2, $3, $4) RETURNING *;', [name, phone, email, pwd]);
  res.json(rows[0]);
});

app.listen(process.env.WEBPORT, () => {
  console.log(`Server listening on port ${process.env.WEBPORT}`);
});
