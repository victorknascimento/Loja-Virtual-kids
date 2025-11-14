
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getOrders, setOrders } from '../services/localStorageService';
import { Order } from '../types';
import { STORE_PHONE } from '../constants';

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({ street: '', city: 'Fortaleza', zip: '' });
  
  if (!currentUser) {
      // Redirect to register page if not logged in
      navigate('/register');
      return null;
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newOrder: Order = {
      id: Date.now().toString(),
      userId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      items: cart,
      total: cartTotal,
      address,
      timestamp: new Date().toISOString()
    };
    
    const orders = getOrders();
    setOrders([...orders, newOrder]);
    
    const orderItemsText = cart.map(item => `${item.quantity}x ${item.name} (R$ ${item.price.toFixed(2)})`).join('%0A');
    const message = `Olá! Gostaria de fazer um novo pedido:%0A%0A${orderItemsText}%0A%0ATotal: R$ ${cartTotal.toFixed(2)}%0A%0AEntregar em:%0A${address.street}, ${address.city} - ${address.zip}%0A%0ACliente: ${currentUser.name}`;
    
    const whatsappUrl = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    clearCart();
    navigate('/confirmation');
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Endereço de Entrega</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="street" className="block font-bold mb-1">Rua e Número</label>
            <input type="text" name="street" id="street" value={address.street} onChange={handleInputChange} className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400" required />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block font-bold mb-1">Cidade</label>
            <input type="text" name="city" id="city" value={address.city} onChange={handleInputChange} className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400" required />
          </div>
          <div className="mb-4">
            <label htmlFor="zip" className="block font-bold mb-1">CEP</label>
            <input type="text" name="zip" id="zip" value={address.zip} onChange={handleInputChange} className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400" required />
          </div>
          <button type="submit" className="w-full mt-4 px-8 py-3 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 transition-colors">
            Confirmar Pedido
          </button>
        </form>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Resumo do Pedido</h2>
        {cart.map(item => (
          <div key={item.id} className="flex justify-between items-center border-b py-2">
            <span>{item.quantity}x {item.name}</span>
            <span>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
          </div>
        ))}
        <div className="mt-4 pt-4 border-t text-right">
          <p className="text-xl font-bold">Total: R$ {cartTotal.toFixed(2).replace('.', ',')}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;