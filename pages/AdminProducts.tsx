
import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';
import { generateProductDescription } from '../services/geminiService';

const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Omit<Product, 'id'> | Product | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const openModal = (product: Product | null = null) => {
    setCurrentProduct(product || { name: '', description: '', price: 0, imageUrl: '', category: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentProduct) return;
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: name === 'price' ? parseFloat(value) : value });
  };
  
  const handleGenerateDescription = async () => {
    if (!currentProduct || !currentProduct.name || !currentProduct.category) {
        alert("Por favor, preencha o nome e a categoria do produto primeiro.");
        return;
    }
    setIsGenerating(true);
    try {
        const description = await generateProductDescription(currentProduct.name, currentProduct.category);
        setCurrentProduct({...currentProduct, description});
    } catch (error) {
        console.error(error);
        alert("Erro ao gerar descrição.");
    } finally {
        setIsGenerating(false);
    }
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;
    if ('id' in currentProduct) {
      updateProduct(currentProduct);
    } else {
      addProduct(currentProduct);
    }
    closeModal();
  };
  
  const handleDelete = (productId: string) => {
      if(window.confirm('Tem certeza que deseja excluir este produto?')) {
          deleteProduct(productId);
      }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-600">Gerenciar Produtos</h1>
        <button onClick={() => openModal()} className="px-4 py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600">
          Adicionar Produto
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-pink-100">
              <th className="p-3">Imagem</th>
              <th className="p-3">Nome</th>
              <th className="p-3">Preço</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b">
                <td className="p-3"><img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded"/></td>
                <td className="p-3 font-semibold">{product.name}</td>
                <td className="p-3">R$ {product.price.toFixed(2)}</td>
                <td className="p-3">
                  <button onClick={() => openModal(product)} className="text-blue-500 hover:underline mr-4">Editar</button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:underline">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{'id' in currentProduct ? 'Editar' : 'Adicionar'} Produto</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Nome</label>
                <input type="text" name="name" value={currentProduct.name} onChange={handleChange} className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400" required />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Categoria</label>
                <input type="text" name="category" value={currentProduct.category} onChange={handleChange} className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400" required />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Descrição</label>
                 <textarea name="description" value={currentProduct.description} onChange={handleChange} className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400" rows={3} required />
                 <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="mt-2 text-sm px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400">
                    {isGenerating ? 'Gerando...' : 'Gerar com IA'}
                 </button>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Preço</label>
                <input type="number" name="price" step="0.01" value={currentProduct.price} onChange={handleChange} className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400" required />
              </div>
              <div className="mb-4">
                <label className="block mb-1">URL da Imagem</label>
                <input type="text" name="imageUrl" value={currentProduct.imageUrl} onChange={handleChange} className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400" required />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;