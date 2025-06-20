import { Component, useState, useEffect } from "react";
import { useNavigate } from 'react-router';

export default function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token);
            navigate('/home');
        } else {
            setErro(data.mensagem);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl text-black font-bold mb-6 text-center">Login</h2>

                {erro && <p className="text-red-500 mb-4 text-sm">{erro}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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