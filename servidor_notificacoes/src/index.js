const express = require('express');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Servidor de Notificações');
});

app.listen(port, () => {
  console.log(`Servidor de Notificações rodando na porta ${port}`);
});
