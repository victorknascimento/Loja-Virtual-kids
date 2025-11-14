
import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminUsers = () => {
  const { users } = useAuth();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Usuários Cadastrados</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-pink-100">
              <th className="p-3">ID</th>
              <th className="p-3">Nome</th>
              <th className="p-3">Telefone</th>
              <th className="p-3">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b">
                <td className="p-3 text-sm text-gray-600">{user.id}</td>
                <td className="p-3 font-semibold">{user.name}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'ADMIN' ? 'bg-purple-200 text-purple-800' : 'bg-green-200 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;