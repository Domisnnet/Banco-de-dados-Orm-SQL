// front-end/app-react/src/App.tsx

import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

// ----------------------------------------------------
// DEFINIÇÃO DA URL DA API (Lida da Variável de Ambiente)
// ----------------------------------------------------
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/';
// A URL completa da rota de usuários
const API_USUARIOS_URL = `${API_BASE_URL}usuarios`;


// Interface (tipagem) para o usuário
interface Usuario {
    id: number;
    nome: string;
    email: string;
}

// ----------------------------------------------------
// 1. COMPONENTE FORMULÁRIO DE CRIAÇÃO (Create)
// ----------------------------------------------------

interface FormularioProps {
    onUsuarioCadastrado: () => void;
}

const FormularioUsuario: React.FC<FormularioProps> = ({ onUsuarioCadastrado }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('Pronto para cadastrar.');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setStatus('Enviando...');
        
        // REQUISIÇÃO POST USANDO A NOVA VARIÁVEL
        axios.post(API_USUARIOS_URL, { nome, email }) 
            .then(response => {
                setStatus(`Sucesso: Usuário ${response.data.nome} criado!`);
                setNome('');
                setEmail('');
                onUsuarioCadastrado(); 
            })
            .catch(error => {
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


// ----------------------------------------------------
// 2. COMPONENTE FORMULÁRIO DE EDIÇÃO (Update)
// ----------------------------------------------------

interface FormularioEdicaoProps {
    usuario: Usuario;
    onFinalizarEdicao: () => void;
}

const FormularioEdicao: React.FC<FormularioEdicaoProps> = ({ usuario, onFinalizarEdicao }) => {
    const [nome, setNome] = useState(usuario.nome);
    const [email, setEmail] = useState(usuario.email);
    const [status, setStatus] = useState('Pronto para editar.');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setStatus('Atualizando...');
        
        // REQUISIÇÃO PUT USANDO A NOVA VARIÁVEL
        axios.put(`${API_USUARIOS_URL}/${usuario.id}`, { nome, email }) 
            .then(() => {
                setStatus(`Sucesso: Usuário ${nome} atualizado!`);
                onFinalizarEdicao(); 
            })
            .catch(error => {
                const msg = error.response?.data?.error || 'Erro desconhecido ao atualizar.';
                setStatus(`Erro: ${msg}`);
            });
    };

    return (
        <div style={{ border: '1px solid orange', padding: '15px', marginBottom: '10px', display: 'inline-block' }}>
            <h4>Editando: {usuario.nome} (ID: {usuario.id})</h4>
            <form onSubmit={handleSubmit} style={{ display: 'inline' }}>
                <input 
                    type="text" 
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)} 
                    placeholder="Nome" 
                    required 
                />
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                    style={{ marginLeft: '10px' }}
                />
                <button type="submit" style={{ marginLeft: '10px' }}>Salvar Edição</button>
                <button type="button" onClick={onFinalizarEdicao} style={{ marginLeft: '10px' }}>Cancelar</button>
            </form>
            <p style={{ marginTop: '10px' }}>Status: {status}</p>
        </div>
    );
};


// ----------------------------------------------------
// 3. COMPONENTE PRINCIPAL (App) - CRUD COMPLETO
// ----------------------------------------------------

function App() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState<Usuario | null>(null);

    const fetchUsuarios = () => {
        setLoading(true);
        setEditingUser(null);
        // REQUISIÇÃO GET USANDO A NOVA VARIÁVEL
        axios.get<Usuario[]>(API_USUARIOS_URL) 
            .then(response => {
                setUsuarios(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar dados do Backend:', error);
                setLoading(false);
            });
    };

    const handleDelete = (id: number, nome: string) => {
        if (!window.confirm(`Tem certeza que deseja deletar o usuário ${nome}?`)) {
            return;
        }
        
        // REQUISIÇÃO DELETE USANDO A NOVA VARIÁVEL
        axios.delete(`${API_USUARIOS_URL}/${id}`) 
            .then(() => {
                console.log(`Usuário ${nome} deletado com sucesso.`);
                fetchUsuarios(); 
            })
            .catch(error => {
                console.error('Erro ao deletar usuário:', error);
                alert('Erro ao deletar usuário. Verifique o console.');
            });
    };
    
    const handleFinalizarEdicao = () => {
        setEditingUser(null);
        fetchUsuarios(); 
    }

    useEffect(() => {
        fetchUsuarios();
    }, []); 

    return (
        <div style={{ padding: '20px' }}>
            <h1>Aplicação Full Stack (React ↔ Node/Prisma)</h1>
            
            <FormularioUsuario onUsuarioCadastrado={fetchUsuarios} /> 

            <h2>Lista de Usuários</h2>
            {loading ? (
                <p>Carregando...</p>
            ) : usuarios.length === 0 ? (
                <p>Nenhum usuário cadastrado.</p>
            ) : (
                <ul>
                    {usuarios.map(user => (
                        <li key={user.id} style={{ marginBottom: '10px' }}>
                            {editingUser && editingUser.id === user.id ? (
                                <FormularioEdicao 
                                    usuario={user} 
                                    onFinalizarEdicao={handleFinalizarEdicao}
                                />
                            ) : (
                                <span>
                                    <strong>{user.nome}</strong>: {user.email} (ID: {user.id})
                                    
                                    <button 
                                        onClick={() => setEditingUser(user)}
                                        style={{ marginLeft: '15px', color: 'blue' }}
                                    >
                                        Editar
                                    </button>

                                    <button 
                                        onClick={() => handleDelete(user.id, user.nome)}
                                        style={{ marginLeft: '10px', color: 'red' }}
                                    >
                                        Deletar
                                    </button>
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;