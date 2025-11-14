
import React, { useState, useEffect } from 'react';
import { getOrders } from '../services/localStorageService';
import { Order } from '../types';

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Sort orders by most recent first
    const sortedOrders = getOrders().sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setOrders(sortedOrders);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Pedidos Realizados</h1>
      <div className="space-y-6">
        {orders.length === 0 ? (
          <p>Nenhum pedido foi realizado ainda.</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                    <h2 className="font-bold text-lg">Pedido #{order.id}</h2>
                    <p className="text-sm text-gray-600">Data: {new Date(order.timestamp).toLocaleString('pt-BR')}</p>
                </div>
                <p className="text-lg font-bold text-pink-600">Total: R$ {order.total.toFixed(2).replace('.', ',')}</p>
              </div>
              <div className="text-sm">
                  <p><strong>Cliente:</strong> {order.customerName} ({order.customerPhone})</p>
                  <p><strong>Endereço:</strong> {order.address.street}, {order.address.city} - {order.address.zip}</p>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Itens:</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {order.items.map(item => (
                    <li key={item.id}>
                      {item.quantity}x {item.name} - R$ {item.price.toFixed(2).replace('.', ',')}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrders;