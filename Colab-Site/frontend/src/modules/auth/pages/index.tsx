import React from 'react';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

const AuthPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Área Administrativa</h1>
          
          {/* Login Form - Mantendo visual atual */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="seu@email.com"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Senha
                </label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
