import { useCallback } from 'react';
import { useLocation } from 'wouter';

export const useNavigation = () => {
  const [location, setLocation] = useLocation();
  const basePath = import.meta.env.BASE_URL;

  const getPath = useCallback((path: string) => {
    // Retornamos o caminho como está, pois o hook customizado do router em App.tsx
    // já lida com o prefixo do base path.
    return path;
  }, []);

  const navigate = useCallback((to: string) => {
    setLocation(to);
  }, [setLocation]);

  return {
    currentPath: location,
    getPath,
    navigate
  };
}; 