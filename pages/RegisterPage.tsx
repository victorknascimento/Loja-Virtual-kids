
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (register(name, phone)) {
      alert('Cadastro realizado com sucesso! Por favor, faça o login.');
      navigate('/login');
    } else {
      setError('Este telefone já está em uso.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-3xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Cadastro</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Nome Completo
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>
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
          Cadastrar
        </button>
      </form>
      <p className="text-center mt-4">
        Já tem uma conta?{' '}
        <Link to="/login" className="text-pink-500 hover:underline">
          Faça login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
