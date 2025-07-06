import { useCallback } from 'react';
import { useLocation } from 'wouter';

export const useNavigation = () => {
  const [location, setLocation] = useLocation();
  const basePath = import.meta.env.BASE_URL;

  const getPath = useCallback((path: string) => {
    // Se for um link de âncora, retorna como está
    if (path.startsWith('#')) {
      return path;
    }
    
    // Remove o base path da localização atual para comparação
    const currentPath = location.replace(basePath, '');
    
    // Adiciona o base path para navegação
    const fullPath = path === '/' ? basePath : `${basePath}${path}`.replace('//', '/');
    
    return fullPath;
  }, [location, basePath]);

  const navigate = useCallback((to: string) => {
    if (to.startsWith('#')) {
      window.location.hash = to;
      return;
    }
    setLocation(getPath(to));
  }, [getPath, setLocation]);

  return {
    currentPath: location.replace(basePath, ''),
    getPath,
    navigate
  };
}; 