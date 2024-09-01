const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  user: 'user',
  host: 'db',
  database: 'notifications_db',
  password: 'password',
  port: 5432,
});

app.post('/notificacoes', async (req, res) => {
  const { mensagem } = req.body;
  await pool.query('INSERT INTO notificacoes(mensagem) VALUES($1)', [mensagem]);
  res.status(201).send('Notificação criada');
});

app.listen(3000, () => {
  console.log('API de Envio escutando na porta 3000');
});
