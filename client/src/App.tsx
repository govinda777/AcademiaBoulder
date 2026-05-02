import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ProgramDetails from "@/pages/program-details";
import EventDetails from "@/pages/event-details";
import AppShell from "@/components/layout/AppShell";
import { useState, useEffect } from "react";

// Hook personalizado para lidar com o base path
const useBasePath = (): [string, (to: string) => void] => {
  const getInitialPath = () => {
    const basePath = import.meta.env.VITE_BASE_PATH || import.meta.env.BASE_URL || "/";
    let path = window.location.pathname;

    if (basePath !== "/" && path.startsWith(basePath)) {
      path = path.replace(basePath, "");
    }

    if (!path.startsWith("/")) {
      path = "/" + path;
    }

    return path;
  };

  const [base] = useState(() => import.meta.env.VITE_BASE_PATH || import.meta.env.BASE_URL || "/");
  const [location, setLocation] = useState(getInitialPath);

  useEffect(() => {
    const handleLocationChange = () => {
      setLocation(getInitialPath());
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const navigate = (to: string) => {
    // Se for apenas uma âncora e não estivermos na home, vai para a home com a âncora
    if (to.startsWith('#') && location !== '/') {
      to = '/' + to;
    }

    const [pathWithoutHash, hash] = to.split('#');

    const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;

    // Se pathWithoutHash for vazio, mantém o location atual
    const targetPath = pathWithoutHash === "" ? location : (pathWithoutHash.startsWith('/') ? pathWithoutHash : '/' + pathWithoutHash);

    const fullUrl = cleanBase + (targetPath === "/" ? "" : targetPath) + (hash ? '#' + hash : '');

    window.history.pushState(null, "", fullUrl);
    setLocation(targetPath);

    // Sempre dispara hashchange se houver hash, para garantir o scroll
    if (hash) {
      // Pequeno delay para garantir que a navegação de página (se houver) já ocorreu
      setTimeout(() => {
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }, 100);
    }
  };

  return [location, navigate];
};

function App() {
  return (
    <WouterRouter hook={useBasePath}>
      <TooltipProvider>
        <Toaster />
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          <AppShell />
          <main className="flex-grow">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/programas/:id" component={ProgramDetails} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
      </TooltipProvider>
    </WouterRouter>
  );
}

export default App;
