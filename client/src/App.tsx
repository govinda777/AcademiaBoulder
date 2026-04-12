import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ProgramDetails from "@/pages/program-details";
import EventDetails from "@/pages/event-details";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/back-to-top";
import { useState, useEffect } from "react";

// Hook personalizado para lidar com o base path
const useBasePath = (): [string, (to: string) => void] => {
  const [base, setBase] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    // Obtém o base path do Vite em produção
    const basePath = import.meta.env.VITE_BASE_PATH || import.meta.env.BASE_URL;
    setBase(basePath);

    // Atualiza a localização inicial
    let path = window.location.pathname;
    if (basePath !== "/" && path.startsWith(basePath)) {
        path = path.replace(basePath, "");
    }
    if (!path.startsWith("/")) {
        path = "/" + path;
    }
    setLocation(path);

    // Listener para mudanças na URL
    const handleLocationChange = () => {
      let newPath = window.location.pathname;
      if (basePath !== "/" && newPath.startsWith(basePath)) {
        newPath = newPath.replace(basePath, "");
      }
      if (!newPath.startsWith("/")) {
        newPath = "/" + newPath;
      }
      setLocation(newPath);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const navigate = (to: string) => {
    const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
    const cleanTo = to.startsWith('/') ? to : '/' + to;
    const newPath = cleanBase + (to === "/" ? "" : cleanTo);

    window.history.pushState(null, "", newPath);
    setLocation(to);
  };

  return [location, navigate];
};

function App() {
  return (
    <WouterRouter hook={useBasePath}>
      <TooltipProvider>
        <Toaster />
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          <Header />
          <main className="flex-grow">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/programas/:id" component={ProgramDetails} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
          <BackToTop />
        </div>
      </TooltipProvider>
    </WouterRouter>
  );
}

export default App;
