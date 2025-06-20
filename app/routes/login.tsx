import { Component, useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import api from '../services/api';


export default function Login() {

    const [id_usuario, setIdUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/login', { id_usuario, senha }, { withCredentials: true });

            // Remova o uso de localStorage:
            // localStorage.setItem('token', res.data.token);

            navigate('/home');
        } catch (err: any) {
            setErro(err.response?.data?.mensagem || 'Erro ao fazer login');
        }
    };



    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl text-black font-bold mb-6 text-center">Login</h2>

                {erro && <p className="text-red-500 mb-4 text-sm">{erro}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Id"
                        value={id_usuario}
                        onChange={e => setIdUsuario(e.target.value)}
                        className="w-full px-4  text-black py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        className="w-full px-4  text-black py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600  hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );

}