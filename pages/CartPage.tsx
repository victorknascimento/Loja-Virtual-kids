
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Carrinho de Compras</h1>
      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 text-xl">Seu carrinho está vazio.</p>
          <Link to="/" className="mt-4 inline-block px-6 py-3 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 transition-colors">
            Ver Produtos
          </Link>
        </div>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b py-4">
              <div className="flex items-center mb-4 sm:mb-0">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                <div>
                  <h2 className="font-bold text-lg text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 text-center border rounded-md py-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <p className="font-semibold w-24 text-right">
                  R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                </p>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 text-right">
            <h3 className="text-2xl font-bold">Total: R$ {cartTotal.toFixed(2).replace('.', ',')}</h3>
            <Link to="/checkout" className="mt-4 inline-block px-8 py-3 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 transition-colors">
              Finalizar Compra
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;