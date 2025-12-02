import { useEffect } from 'react';

export const useScrollToTop = () => {
  useEffect(() => {
    // Força o scroll para o topo imediatamente quando o componente monta
    // Usando múltiplas abordagens para garantir que funcione
    
    // 1. Scroll imediato
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // 2. Usando requestAnimationFrame para garantir que aconteça no próximo frame
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
    
    // 3. Backup com timeout mínimo
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 1);

    return () => clearTimeout(timeoutId);
  }, []);
};
