
'use client';

import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";

const Footer = ({ catalog, topProducts }: { catalog: Catalog, topProducts: Product[] }) => {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();
  const featuredProducts = topProducts;
  
  return (
    <footer className="bg-nut-900 pt-8 pb-4">
      <div className="container mx-auto px-4">
        {/* Mobile Layout */}
        {isMobile ? (
          <div className="space-y-6">
            {/* Brand and description - shorter for mobile */}
            <div>
              <Link href="/" className="inline-block mb-2">
                <h2 className="text-xl font-playfair font-bold text-white">{catalog.name}</h2>
              </Link>
              <p className="text-nut-200 text-sm mb-0">
                {catalog.description}
              </p>
            </div>
            
            {/* Two columns layout for mobile */}
            <div className="grid grid-cols-2 gap-4">
              {/* Featured Products */}
              <div>
                <h3 className="text-base font-bold mb-2">Comprar</h3>
                <ul className="space-y-1">
                  {featuredProducts.length > 0 ? (
                    featuredProducts.slice(0, 2).map((product) => (
                      <li key={product.id}>
                        <Link href={`/producto/${product.slug}`} className="text-nut-200 text-xs hover:text-white transition-colors">
                          {product.name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs">Cargando...</li>
                  )}
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-base font-bold mb-2">Categorías</h3>
                <ul className="space-y-1">
                  {catalog.categories.map((category) => (
                    <li key={category.id}>
                      <Link href={`/productos?category=${category.id}`} className="text-nut-200 text-xs hover:text-white transition-colors">
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-nut-200">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="text-nut-200 text-sm">{catalog.whatsapp_number}</span>
              </div>
              <p className="text-nut-300 text-xs text-center">
                &copy; {currentYear} {catalog.name}.
              </p>
            </div>
          </div>
        ) : (
          /* Desktop layout remains the same */
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div>
                <Link href="/" className="inline-block mb-4">
                  <h2 className="text-xl font-playfair font-bold text-white">{catalog.name}</h2>
                </Link>
                <p className="text-nut-200 mb-4">
                  {catalog.description}
                </p>
              </div>

              {/* Featured Products */}
              <div>
                <h3 className="text-lg font-bold mb-4">Comprar</h3>
                <ul className="space-y-2">
                  {featuredProducts.length > 0 ? (
                    featuredProducts.map((product) => (
                      <li key={product.id}>
                        <Link href={`/producto/${product.slug}`} className="text-nut-200 hover:text-white transition-colors">
                          {product.name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li>Cargando productos...</li>
                  )}
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-lg font-bold mb-4">Categorías</h3>
                <ul className="space-y-2">
                  {catalog.categories.map((category) => (
                    <li key={category.id}>
                      <Link href={`/productos?category=${(category.id)}`} className="text-nut-200 hover:text-white transition-colors">
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-lg font-bold mb-4">Contacto</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-nut-200 mt-1">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="text-nut-200">
                      {catalog.whatsapp_number}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-nut-800">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-nut-300 text-sm">
                  &copy; {currentYear} {catalog.name}. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
