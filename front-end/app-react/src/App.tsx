import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

// URL base da sua API
const API_URL = 'http://localhost:3001/usuarios';

// Interface (tipagem) para o usuário no TypeScript
interface Usuario {
    id: number;
    nome: string;
    email: string;
}

// ----------------------------------------------------
// 1. COMPONENTE FORMULÁRIO (Criação de Usuário)
// ----------------------------------------------------

// Define as propriedades que o componente Formulário espera
interface FormularioProps {
    onUsuarioCadastrado: () => void; // Função para recarregar a lista
}

const FormularioUsuario: React.FC<FormularioProps> = ({ onUsuarioCadastrado }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('Pronto para cadastrar.');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setStatus('Enviando...');
        
        // Requisição POST para o backend
        axios.post(API_URL, { nome, email })
            .then(response => {
                setStatus(`Sucesso: Usuário ${response.data.nome} criado!`);
                setNome('');
                setEmail('');
                
                // Chama a função passada pelo pai para recarregar a lista
                onUsuarioCadastrado(); 
            })
            .catch(error => {
                // Trata erros retornados pelo Express/Prisma (ex: email duplicado)
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
// 2. COMPONENTE PRINCIPAL (App)
// ----------------------------------------------------

function App() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]); // Usa a tipagem Usuario[]
    const [loading, setLoading] = useState(true);

    // Função que faz a requisição GET para o backend
    const fetchUsuarios = () => {
        setLoading(true); // Indica que a busca começou
        axios.get<Usuario[]>(API_URL) // Tipa a resposta esperada
            .then(response => {
                setUsuarios(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar dados do Backend:', error);
                setLoading(false);
            });
    };

    // Executa a busca assim que o componente é montado
    useEffect(() => {
        fetchUsuarios();
    }, []); 

    return (
        <div style={{ padding: '20px' }}>
            <h1>Aplicação Full Stack (React ↔ Node/Prisma)</h1>
            
            {/* Adiciona o formulário e passa a função de recarregar */}
            <FormularioUsuario onUsuarioCadastrado={fetchUsuarios} /> 

            <h2>Lista de Usuários</h2>
            {loading ? (
                <p>Carregando...</p>
            ) : usuarios.length === 0 ? (
                <p>Nenhum usuário cadastrado.</p>
            ) : (
                <ul>
                    {usuarios.map(user => (
                        // Adiciona um botão Delete aqui no futuro!
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