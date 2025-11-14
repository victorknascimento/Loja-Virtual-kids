
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { UserRole } from '../types';
import Logo from './Logo';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-pink-500 shadow-md sticky top-0 z-50 text-white">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="flex-shrink-0">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {currentUser?.role === UserRole.ADMIN && (
            <Link to="/admin" className="hover:text-pink-200 transition duration-300">Admin</Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative hover:text-pink-200 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{itemCount}</span>
            )}
          </Link>

          {currentUser ? (
            <div className="relative group">
              <button className="flex items-center space-x-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 <span className="hidden sm:inline">{currentUser.name.split(' ')[0]}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block text-gray-700">
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-pink-100">
                  Sair
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="px-4 py-2 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-pink-500 transition duration-300">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;