// front-end/app-react/src/App.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// URL base da sua API
const API_URL = 'http://localhost:3001/usuarios';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hook para buscar dados quando o componente é montado
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = () => {
    axios.get(API_URL)
      .then(response => {
        setUsuarios(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar dados do Backend:', error);
        setLoading(false);
      });
  };

  if (loading) {
    return <h1>Carregando dados da API...</h1>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Conexão Full Stack (React ↔ Node/Prisma)</h2>
      
      {usuarios.length === 0 ? (
        <p>Nenhum usuário encontrado. Adicione um via POST/Insomnia para aparecer aqui.</p>
      ) : (
        <div>
            <h3>Usuários Cadastrados:</h3>
            <ul>
              {usuarios.map(user => (
                // Use user.id como chave, é o padrão do Prisma
                <li key={user.id}>
                  <strong>{user.nome}</strong>: {user.email}
                </li>
              ))}
            </ul>
        </div>
      )}
    </div>
  );
}

export default App;