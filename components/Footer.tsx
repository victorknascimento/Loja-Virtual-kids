
import React from 'react';
import { STORE_PHONE, STORE_ADDRESS } from '../constants';

const Footer = () => {
  return (
    <footer className="bg-pink-500 text-pink-100 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Juju Kids - Moda Infantil</h3>
        <p className="mb-1">{STORE_ADDRESS}</p>
        <p className="mb-4">Telefone / WhatsApp: {STORE_PHONE}</p>
        <p className="text-sm text-pink-200">&copy; {new Date().getFullYear()} Juju Kids. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;