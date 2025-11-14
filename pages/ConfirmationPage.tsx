
import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmationPage = () => {
  return (
    <div className="text-center bg-white p-10 rounded-lg shadow-lg max-w-2xl mx-auto">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h1 className="text-3xl font-bold text-pink-600 mb-2">Obrigado pela sua compra!</h1>
      <p className="text-gray-600 mb-4">Seu pedido foi recebido e já estamos preparando tudo com muito carinho.</p>
      <div className="bg-pink-100 p-4 rounded-md">
        <p className="font-semibold text-pink-800">Seu pedido chegará em um prazo de 30 a 60 minutos.</p>
      </div>
       <p className="text-gray-600 my-4">Uma mensagem foi enviada ao nosso WhatsApp para confirmar. Acompanhe o status por lá!</p>
      <Link to="/" className="mt-6 inline-block px-8 py-3 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 transition-colors">
        Voltar para a Loja
      </Link>
    </div>
  );
};

export default ConfirmationPage;