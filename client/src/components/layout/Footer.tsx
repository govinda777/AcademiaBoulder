import { Link } from "wouter";
import { Facebook, Instagram, Youtube, Phone, Clock, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Academia Boulder</h3>
            <p className="text-neutral-300 mb-4">
              Centro de excelência em escalada boulder com metodologias avançadas para todos os níveis.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://web.facebook.com/academiaboulder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white transition duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/academiaboulder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white transition duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white transition duration-300"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#programas" className="text-neutral-300 hover:text-white transition duration-300">
                  Programas
                </Link>
              </li>
              <li>
                <Link href="#agenda" className="text-neutral-300 hover:text-white transition duration-300">
                  Agenda
                </Link>
              </li>
              <li>
                <Link href="#comunidade" className="text-neutral-300 hover:text-white transition duration-300">
                  Comunidade
                </Link>
              </li>
              <li>
                <Link href="#sobre" className="text-neutral-300 hover:text-white transition duration-300">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="#contato" className="text-neutral-300 hover:text-white transition duration-300">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Programs */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Programas</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#escalada" className="text-neutral-300 hover:text-white transition duration-300">
                  Escalada Esportiva
                </Link>
              </li>
              <li>
                <Link href="#crosstraining" className="text-neutral-300 hover:text-white transition duration-300">
                  Cross Training
                </Link>
              </li>
              <li>
                <Link href="#instrutores" className="text-neutral-300 hover:text-white transition duration-300">
                  Formação de Instrutores
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-300 hover:text-white transition duration-300">
                  Aulas para Crianças
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-300 hover:text-white transition duration-300">
                  Treinamento Personalizado
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                <span className="text-neutral-300">Av. Exemplo, 1234 - Centro, São Paulo - SP</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                <span className="text-neutral-300">(11) 5555-1234</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                <span className="text-neutral-300">contato@academiaboulder.com.br</span>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                <span className="text-neutral-300">
                  Seg-Sex: 07h às 22h<br/>
                  Sáb-Dom: 08h às 20h
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-neutral-400">
            &copy; {new Date().getFullYear()} Academia Boulder. Todos os direitos reservados.
          </p>
          <div className="mt-2">
            <Link href="#" className="text-neutral-400 hover:text-white mx-2 text-sm">
              Termos de Uso
            </Link>
            <Link href="#" className="text-neutral-400 hover:text-white mx-2 text-sm">
              Política de Privacidade
            </Link>
            <Link href="#" className="text-neutral-400 hover:text-white mx-2 text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
