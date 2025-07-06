import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown } from "lucide-react";
import { useNavigation } from "@/hooks/use-navigation";

const Header = () => {
  const { currentPath, getPath, navigate } = useNavigation();
  const [programsOpen, setProgramsOpen] = useState(false);

  const navigationItems = [
    { name: "Home", path: "/" },
    { 
      name: "Programas", 
      path: "#programas",
      dropdown: true,
      items: [
        { name: "Escalada Esportiva", path: "#escalada" },
        { name: "Cross Training", path: "#crosstraining" },
        { name: "Formação de Instrutores", path: "#instrutores" }
      ]
    },
    { name: "Agenda", path: "#agenda" },
    { name: "Comunidade", path: "#comunidade" },
    { name: "Sobre", path: "#sobre" },
    { name: "Contato", path: "#contato" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button onClick={() => navigate("/")} className="flex items-center">
              <span className="text-2xl font-bold font-sans">
                <span className="text-primary">Academia</span>
                <span className="text-secondary">Boulder</span>
              </span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navigationItems.map((item) => 
                    item.dropdown ? (
                      <div key={item.name} className="flex flex-col">
                        <button 
                          onClick={() => setProgramsOpen(!programsOpen)}
                          className="flex justify-between items-center py-2 text-secondary hover:text-primary font-medium"
                        >
                          {item.name}
                          <ChevronDown className={cn("h-4 w-4 transition-transform", programsOpen && "rotate-180")} />
                        </button>
                        {programsOpen && (
                          <div className="pl-4 py-2 flex flex-col gap-2">
                            {item.items.map((subItem) => (
                              <button 
                                key={subItem.name}
                                onClick={() => navigate(subItem.path)}
                                className="py-2 text-secondary hover:text-primary text-left"
                              >
                                {subItem.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <button 
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        className="py-2 text-secondary hover:text-primary font-medium text-left"
                      >
                        {item.name}
                      </button>
                    )
                  )}
                  <button onClick={() => navigate("#agendamento")}>
                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                      Agendar Aula
                    </Button>
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => 
              item.dropdown ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <button className="nav-link flex items-center">
                      {item.name}
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    {item.items.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <button 
                          onClick={() => navigate(subItem.path)}
                          className="block px-4 py-2 text-sm text-secondary hover:bg-neutral-100 hover:text-primary w-full text-left"
                        >
                          {subItem.name}
                        </button>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button 
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "nav-link",
                    currentPath === item.path && "text-primary"
                  )}
                >
                  {item.name}
                </button>
              )
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button onClick={() => navigate("#agendamento")}>
              <Button className="bg-primary hover:bg-primary/90">
                Agendar Aula
              </Button>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
