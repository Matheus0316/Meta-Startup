import React from 'react';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

const UsersPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Gerenciamento de Usuários</h1>
          
          {/* Users List - Mantendo visual atual */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Lista de Usuários</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                Novo Usuário
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data de Criação
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Dados serão carregados via API */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Carregando...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      -
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      -
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      -
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">
                        Editar
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Excluir
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UsersPage;
