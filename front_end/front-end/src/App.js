import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Função para carregar as notificações da api-recebimento
  const fetchNotifications = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:3001/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      setError('Erro ao buscar notificações');
    } finally {
      setLoading(false);
    }
  };

  // Função para enviar uma nova notificação
  const sendNotification = async () => {
    setError('');
    try {
      await axios.post('http://localhost:3000/notifications', { mensagem: newNotification });
      setNewNotification('');
      fetchNotifications();
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
      setError('Erro ao enviar notificação');
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="App">
      <h1>Notificações</h1>
      <div>
        <input
          type="text"
          value={newNotification}
          onChange={(e) => setNewNotification(e.target.value)}
          placeholder="Digite uma nova notificação"
        />
        <button onClick={sendNotification}>Enviar</button>
      </div>
      {loading && <p>Carregando notificações...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {notifications.map((notif) => (
          <li key={notif.id}>{notif.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
