
import React from 'react';
import ProductCard from '../components/ProductCard';
import StoreStatusBanner from '../components/StoreStatusBanner';
import { useProducts } from '../context/ProductContext';
import { useStoreHours } from '../hooks/useStoreHours';

const HomePage = () => {
  const { products } = useProducts();
  const { isOpen } = useStoreHours();

  return (
    <div>
      <h1 className="font-display font-bold text-5xl md:text-6xl text-center text-pink-600 mb-2 uppercase tracking-tight">Juju Kids</h1>
      <p className="text-center text-pink-500 text-xs mb-8">Loja virtual</p>
      
      <StoreStatusBanner isOpen={isOpen} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} isStoreOpen={isOpen} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;