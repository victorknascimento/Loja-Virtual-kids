
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(phone)) {
      navigate('/');
    } else {
      setError('Telefone não encontrado. (Admin: 5585999195930)');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-3xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
            Telefone / WhatsApp
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Ex: 5585999998888"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-pink-600 transition-colors"
        >
          Entrar
        </button>
      </form>
      <p className="text-center mt-4">
        Não tem uma conta?{' '}
        <Link to="/register" className="text-pink-500 hover:underline">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;