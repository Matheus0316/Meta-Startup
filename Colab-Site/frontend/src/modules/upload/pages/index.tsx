import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

const UploadPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Gerenciamento de Uploads</h1>
          
          {/* Upload Management - Mantendo visual atual */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Upload */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Upload de Imagens</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="space-y-4">
                  <div className="text-gray-500">
                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600">Arraste e solte imagens aqui, ou</p>
                    <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                      Selecionar Arquivos
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF até 10MB
                  </p>
                </div>
              </div>
              
              {/* Recent Images */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Imagens Recentes</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="aspect-square bg-gray-200 rounded-lg"></div>
                  <div className="aspect-square bg-gray-200 rounded-lg"></div>
                  <div className="aspect-square bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </div>
            
            {/* Document Upload */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Upload de Documentos</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="space-y-4">
                  <div className="text-gray-500">
                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M9 12h6m6 0h6m-6 6h6m-12 0h6m6 6h6m-6 0h6m-12 0h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9 3v42l6-6h24a6 6 0 006-6V9a6 6 0 00-6-6H15z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600">Arraste e solte documentos aqui, ou</p>
                    <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200">
                      Selecionar Arquivos
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX até 50MB
                  </p>
                </div>
              </div>
              
              {/* Recent Documents */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Documentos Recentes</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-2 border border-gray-200 rounded">
                    <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                      <span className="text-xs text-red-600">PDF</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Carregando...</p>
                      <p className="text-xs text-gray-500">-</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Upload History */}
          <div className="mt-8 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Histórico de Uploads</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Arquivo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tamanho
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Carregando...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      -
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      -
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      -
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">
                        Ver
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

export default UploadPage;
