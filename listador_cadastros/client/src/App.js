import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [cadastros, setCadastros] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCadastros() {
      try {
        const response = await axios.get('http://localhost:3001/cadastros');
        setCadastros(response.data);
      } catch (error) {
        console.error('Erro ao carregar cadastros:', error);
        setError('Erro ao carregar cadastros');
      }
    }

    fetchCadastros();
  }, []);

  return (
    <div className="App">
      <h1>Lista de Cadastros</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {cadastros.map(cadastro => (
          <li key={cadastro.cpf}>
            Nome: {cadastro.nome}, Email: {cadastro.email}, Telefone: {cadastro.telefone}, CPF: {cadastro.cpf}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
