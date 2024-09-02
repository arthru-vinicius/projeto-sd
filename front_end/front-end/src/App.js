import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const checkCpfExists = async () => {
    try {
      const response = await axios.get(`http://api-recebimento:3001/cadastros?cpf=${cpf}`);
      return response.data.length > 0;
    } catch (error) {
      console.error('Erro ao verificar CPF:', error);
      setError('Erro ao verificar CPF');
      return false;
    }
  };

  const sendUser = async () => {
    setError('');
    setSuccess('');
    try {
      const cpfExists = await checkCpfExists();
      if (cpfExists) {
        setError('CPF já cadastrado');
        return;
      }

      await axios.post('http://localhost:3000/cadastros', {
        nome,
        email,
        telefone,
        cpf,
      });

      setNome('');
      setEmail('');
      setTelefone('');
      setCpf('');
      setSuccess('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar cadastro:', error);
      setError('Erro ao enviar cadastro');
    }
  };

  return (
    <div className="App">
      <h1>Cadastro de Usuários</h1>
      <div>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite o email"
        />
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="Digite o telefone"
        />
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="Digite o CPF"
        />
        <button onClick={sendUser}>Enviar</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default App;
