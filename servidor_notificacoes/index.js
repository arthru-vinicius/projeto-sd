const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Servidor de Notificações funcionando');
});

app.listen(3002, () => {
  console.log('Servidor de Notificações escutando na porta 3002');
});
