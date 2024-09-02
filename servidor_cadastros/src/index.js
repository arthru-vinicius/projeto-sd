const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 3002;

// Configurações de middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Rota para obter a lista de cadastros
app.get('/api/cadastros', async (req, res) => {
  try {
    const response = await axios.get('http://api-recebimento:3001/cadastros');
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar cadastros:', error);
    res.status(500).json({ error: 'Erro ao buscar cadastros' });
  }
});

// Serve a página HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor de Cadastros escutando na porta ${port}`);
});
