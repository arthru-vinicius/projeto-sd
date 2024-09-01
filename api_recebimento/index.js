const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  user: 'user',
  host: 'db',
  database: 'notifications_db',
  password: 'password',
  port: 5432,
});

app.get('/notificacoes', async (req, res) => {
  const result = await pool.query('SELECT * FROM notificacoes');
  res.json(result.rows);
});

app.listen(3000, () => {
  console.log('API de Recebimento escutando na porta 3000');
});
