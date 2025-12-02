import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll instantâneo para o topo sempre que a rota mudar
    // Usando requestAnimationFrame para garantir que aconteça antes do render
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior
      });
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
