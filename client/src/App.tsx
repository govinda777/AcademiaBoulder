import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ProgramDetails from "@/pages/program-details";
import EventDetails from "@/pages/event-details";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/back-to-top";
import { useLocation } from "wouter";

// Configuração do base path para GitHub Pages
const useHashLocation = () => {
  const [location, setLocation] = useLocation();
  
  const handleLocation = () => {
    const path = location.replace(/^\/AcademiaBoulder/, "");
    return path || "/";
  };

  return [handleLocation(), setLocation];
};

function Router() {
  return (
    <Switch hook={useHashLocation}>
      <Route path="/" component={Home} />
      <Route path="/programas/:id" component={ProgramDetails} />
      <Route path="/eventos/:id" component={EventDetails} />
      <Route component={NotFound} />
    </Switch>
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
