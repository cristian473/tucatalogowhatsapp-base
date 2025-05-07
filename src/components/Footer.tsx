
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-nut-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-xl font-playfair font-bold text-white">NuezMarket</h2>
            </Link>
            <p className="text-nut-200 mb-4">
              Los mejores frutos secos de la región, seleccionados cuidadosamente para brindarte la mejor calidad y sabor.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-nut-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-nut-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-nut-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Groups */}
          <div>
            <h3 className="text-lg font-bold mb-4">Comprar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/productos" className="text-nut-200 hover:text-white transition-colors">
                  Todos los productos
                </Link>
              </li>
              <li>
                <Link to="/productos/nueces" className="text-nut-200 hover:text-white transition-colors">
                  Nueces
                </Link>
              </li>
              <li>
                <Link to="/productos/almendras" className="text-nut-200 hover:text-white transition-colors">
                  Almendras
                </Link>
              </li>
              <li>
                <Link to="/productos/mix" className="text-nut-200 hover:text-white transition-colors">
                  Mix de frutos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/nosotros" className="text-nut-200 hover:text-white transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link to="/politicas-envio" className="text-nut-200 hover:text-white transition-colors">
                  Políticas de envío
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="text-nut-200 hover:text-white transition-colors">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="/preguntas-frecuentes" className="text-nut-200 hover:text-white transition-colors">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-nut-200 mt-1">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-nut-200">
                  Av. Libertador 1234, Buenos Aires
                </span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-nut-200 mt-1">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="text-nut-200">
                  +54 11 5555-5555
                </span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-nut-200 mt-1">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="text-nut-200">
                  contacto@nuezmarket.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-nut-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-nut-300 text-sm">
              &copy; {currentYear} NuezMarket. Todos los derechos reservados.
            </p>
            <div className="mt-4 md:mt-0 flex items-center">
              <img src="https://www.mercadopago.com/org-img/MP3/API/logos/mp-logo-transparent.png" alt="MercadoPago" className="h-6" />
              <span className="mx-2 text-nut-500">|</span>
              <span className="text-nut-300 text-sm">Sitio seguro</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
