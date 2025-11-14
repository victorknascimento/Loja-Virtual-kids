
import { useEffect } from 'react';
import { getUsers, setUsers, getProducts, setProducts } from '../services/localStorageService';
import { UserRole } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

// This component runs once to set up initial data if it doesn't exist.
export const DataInitializer = () => {
  useEffect(() => {
    const users = getUsers();
    if (users.length === 0) {
      setUsers([
        {
          id: 'admin001',
          name: 'Admin',
          phone: '5585999195930',
          role: UserRole.ADMIN,
        }
      ]);
      console.log('Admin user created: 5585999195930 (no password needed)');
    }

    const products = getProducts();
    if (products.length === 0) {
      setProducts(INITIAL_PRODUCTS);
    }
  }, []);

  return null;
};