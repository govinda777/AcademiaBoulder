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
    const basePath = import.meta.env.BASE_URL;
    setBase(basePath);

    // Atualiza a localização inicial
    const path = window.location.pathname.replace(basePath, "") || "/";
    setLocation(path);

    // Listener para mudanças na URL
    const handleLocationChange = () => {
      const newPath = window.location.pathname.replace(basePath, "") || "/";
      setLocation(newPath);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const navigate = (to: string) => {
    const newPath = base + (to === "/" ? "" : to);
    window.history.pushState(null, "", newPath);
    setLocation(to);
  };

  return [location, navigate];
};

function Router() {
  return (
    <WouterRouter hook={useBasePath}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/programas/:id" component={ProgramDetails} />
        <Route path="/eventos/:id" component={EventDetails} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </TooltipProvider>
  );
}

export default App;
