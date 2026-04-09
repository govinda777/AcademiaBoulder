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
    // Se for um link de âncora
    if (to.startsWith('#')) {
      // Se já estivermos na home, apenas atualiza o hash
      if (location === '/' || location === '') {
        window.location.hash = to;
      } else {
        // Se estivermos em outra página, navega para a home com o hash
        setLocation('/' + to);
      }
      return;
    }

    setLocation(to);
  }, [location, setLocation]);

  return {
    currentPath: location,
    getPath,
    navigate
  };
}; 