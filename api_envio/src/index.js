const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: 'user',
  host: 'db',
  database: 'cadastros_db',
  password: 'password',
  port: 5432,
});

app.post('/cadastros', async (req, res) => {
  const { nome, email, telefone, cpf } = req.body;
  
  if (!nome || !email || !telefone || !cpf) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO cadastros (nome, email, telefone, cpf) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, email, telefone, cpf]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao enviar cadastro:', error);
    res.status(500).json({ error: 'Erro ao enviar cadastro' });
  }
});

app.listen(3000, () => {
  console.log('API de Envio escutando na porta 3000');
});
