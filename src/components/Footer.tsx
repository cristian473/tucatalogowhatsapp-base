
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "@/services/productService";
import { useEffect, useState } from "react";
import { Product } from "@/components/ProductCard";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await getFeaturedProducts();
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error("Error loading featured products for footer:", error);
      }
    };
    
    loadFeaturedProducts();
  }, []);
  
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
          </div>

          {/* Featured Products */}
          <div>
            <h3 className="text-lg font-bold mb-4">Comprar</h3>
            <ul className="space-y-2">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <li key={product.id}>
                    <Link to={`/producto/${product.id}`} className="text-nut-200 hover:text-white transition-colors">
                      {product.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>Cargando productos...</li>
              )}
            </ul>
          </div>

          {/* Categories - Reduced to just 4 options */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/productos?categoria=Nueces" className="text-nut-200 hover:text-white transition-colors">
                  Nueces
                </Link>
              </li>
              <li>
                <Link to="/productos?categoria=Almendras" className="text-nut-200 hover:text-white transition-colors">
                  Almendras
                </Link>
              </li>
              <li>
                <Link to="/productos?categoria=Mix" className="text-nut-200 hover:text-white transition-colors">
                  Mix de frutos
                </Link>
              </li>
              <li>
                <Link to="/productos?categoria=Pistachos" className="text-nut-200 hover:text-white transition-colors">
                  Pistachos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact - Only WhatsApp */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-nut-200 mt-1">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="text-nut-200">
                  +54 11 3341-4526
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
