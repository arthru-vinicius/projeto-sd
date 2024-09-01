const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: 'user',
  host: 'db',
  database: 'notifications_db',
  password: 'password',
  port: 5432,
});

app.post('/notifications', async (req, res) => {
  const { mensagem } = req.body;
  
  if (!mensagem) {
    return res.status(400).json({ error: 'A mensagem é obrigatória' });
  }

  try {
    const result = await pool.query('INSERT INTO notifications (mensagem) VALUES ($1) RETURNING *', [mensagem]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao enviar notificação' });
  }
});

app.listen(3000, () => {
  console.log('API de Envio escutando na porta 3000');
});
