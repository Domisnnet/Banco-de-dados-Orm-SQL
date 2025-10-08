// O componente Lista de Usuários permanece no App.jsx, mas vamos adicionar o Formulário

// ... importações (React, useState, useEffect, axios)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/usuarios';

// Novo componente de Formulário
const FormularioUsuario = ({ onUsuarioCadastrado }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Enviando...');
    
    axios.post(API_URL, { nome, email })
      .then(response => {
        setStatus(`Sucesso: Usuário ${response.data.nome} criado!`);
        setNome('');
        setEmail('');
        // Chama a função passada pelo pai para recarregar a lista
        onUsuarioCadastrado(); 
      })
      .catch(error => {
        // Exibe o erro do backend (ex: email já cadastrado)
        const msg = error.response?.data?.error || 'Erro desconhecido ao cadastrar.';
        setStatus(`Erro: ${msg}`);
      });
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
      <h3>Cadastrar Novo Usuário</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          placeholder="Nome" 
          required 
        />
        <br/><br/>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <br/><br/>
        <button type="submit">Cadastrar</button>
      </form>
      <p>Status: {status}</p>
    </div>
  );
};


// Componente Principal (App.jsx)
function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar dados (agora pode ser chamada pelo formulário)
  const fetchUsuarios = () => {
    setLoading(true); // Indica que a busca começou
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

  useEffect(() => {
    fetchUsuarios();
  }, []); 

  // ... (o restante da sua lógica de listagem)

  return (
    <div style={{ padding: '20px' }}>
      <h1>Aplicação Full Stack</h1>
      
      {/* Aqui o Formulário é adicionado e passa a função de recarga */}
      <FormularioUsuario onUsuarioCadastrado={fetchUsuarios} /> 

      <h2>Lista de Usuários</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : usuarios.length === 0 ? (
        <p>Nenhum usuário cadastrado.</p>
      ) : (
        <ul>
          {usuarios.map(user => (
            <li key={user.id}>
              <strong>{user.nome}</strong>: {user.email} (ID: {user.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;