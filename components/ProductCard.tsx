import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  isStoreOpen: boolean;
}

const ProductCard = ({ product, isStoreOpen }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 flex flex-col border border-transparent hover:border-pink-500 hover:shadow-xl hover:scale-105">
      <img src={product.imageUrl} alt={product.name} className="w-full aspect-[3/4] object-cover"/>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-medium text-black">{product.name}</h3>
        
        <div className="mt-auto pt-4 flex flex-col items-start sm:flex-row sm:justify-between sm:items-center">
          <span className="text-3xl font-bold text-black mb-2 sm:mb-0">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          <button
            onClick={() => addToCart(product)}
            disabled={!isStoreOpen}
            className="w-full sm:w-auto px-4 py-2 bg-white text-pink-500 font-semibold rounded-lg shadow-md border border-pink-500 hover:bg-pink-500 hover:text-white transition-colors duration-300 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;