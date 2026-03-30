import React, { useState } from 'react';

export default function AdminProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const correctPassword = 'rezendemotos';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-sm border rounded-xl shadow-md p-6 bg-white">
          <h1 className="text-2xl font-bold text-center mb-2">Área restrita</h1>
          <p className="text-center text-black mb-4">
            Digite a senha para acessar o painel
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
            />

            <button
              type="submit"
              className="w-full bg-black text-white rounded-lg px-4 py-2"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return children;
}