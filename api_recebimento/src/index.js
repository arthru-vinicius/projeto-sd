const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: 'user',
  host: 'db',
  database: 'notifications_db',
  password: 'password',
  port: 5432,
});

app.get('/notifications', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM notifications ORDER BY criado_em DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao recuperar notificações' });
  }
});

app.listen(port, () => {
  console.log(`API de Recebimento escutando na porta ${port}`);
});
