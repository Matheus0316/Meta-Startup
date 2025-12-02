import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Verificar se o usuário está autenticado
  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    return token && user;
  };

  // Se não estiver autenticado, redirecionar para a página inicial
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  // Se estiver autenticado, renderizar o componente filho
  return <>{children}</>;
};

export default ProtectedRoute;
