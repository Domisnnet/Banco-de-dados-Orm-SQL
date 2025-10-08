import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

// URL base da sua API
const API_URL = 'http://localhost:3001/usuarios';

// Interface (tipagem) para o usuário
interface Usuario {
    id: number;
    nome: string;
    email: string;
}

// ----------------------------------------------------
// 1. COMPONENTE FORMULÁRIO (Criação de Usuário)
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
        
        axios.post(API_URL, { nome, email })
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
// 2. COMPONENTE PRINCIPAL (App) - Com Deleção
// ----------------------------------------------------

function App() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsuarios = () => {
        setLoading(true);
        axios.get<Usuario[]>(API_URL)
            .then(response => {
                setUsuarios(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar dados do Backend:', error);
                setLoading(false);
            });
    };

    // Lógica para deletar um usuário
    const handleDelete = (id: number, nome: string) => {
        if (!window.confirm(`Tem certeza que deseja deletar o usuário ${nome}?`)) {
            return;
        }
        
        axios.delete(`${API_URL}/${id}`)
            .then(() => {
                console.log(`Usuário ${nome} deletado com sucesso.`);
                // Recarrega a lista após a deleção
                fetchUsuarios(); 
            })
            .catch(error => {
                console.error('Erro ao deletar usuário:', error);
                alert('Erro ao deletar usuário. Verifique o console.');
            });
    };

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
                            <strong>{user.nome}</strong>: {user.email} (ID: {user.id})
                            
                            <button 
                                onClick={() => handleDelete(user.id, user.nome)}
                                style={{ marginLeft: '15px', color: 'red' }}
                            >
                                Deletar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;