
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Product } from "@/components/ProductCard";
import { getFeaturedProducts, getLatestProducts } from "@/services/productService";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const [featured, latest] = await Promise.all([
          getFeaturedProducts(),
          getLatestProducts()
        ]);
        
        setFeaturedProducts(featured);
        setNewProducts(latest);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-[url('https://images.unsplash.com/photo-1559056199-641db0a2c610?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4">
              Los mejores frutos secos
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
              Seleccionados cuidadosamente para ofrecerte calidad premium y sabor excepcional
            </p>
            <Link to="/productos">
              <Button className="bg-nut-700 hover:bg-nut-800 text-lg px-8 py-6">
                Ver catálogo
              </Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-nut-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 border border-nut-100 rounded-lg bg-white">
                <div className="w-16 h-16 mx-auto mb-4 bg-nut-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-nut-700">
                    <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                    <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                    <path d="M12 20h.01"></path>
                  </svg>
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-2">Envíos Rápidos</h3>
                <p className="text-nut-600">
                  Recibe tus productos en 24-48hs en CABA y GBA. Envíos a todo el país.
                </p>
              </div>

              <div className="text-center p-6 border border-nut-100 rounded-lg bg-white">
                <div className="w-16 h-16 mx-auto mb-4 bg-nut-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-nut-700">
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-2">Calidad Premium</h3>
                <p className="text-nut-600">
                  Frutos seleccionados, almacenados con los mejores estándares de calidad.
                </p>
              </div>

              <div className="text-center p-6 border border-nut-100 rounded-lg bg-white">
                <div className="w-16 h-16 mx-auto mb-4 bg-nut-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-nut-700">
                    <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-2">Pago Seguro</h3>
                <p className="text-nut-600">
                  Integración con MercadoPago. Paga con tarjeta, transferencia o efectivo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nut-700"></div>
              </div>
            ) : (
              <>
                <ProductList products={featuredProducts} title="Productos destacados" />
                <div className="text-center mt-10">
                  <Link to="/productos">
                    <Button variant="outline" className="border-nut-700 text-nut-700 hover:bg-nut-50">
                      Ver todos los productos
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Banner */}
        <section className="py-16 bg-nut-800 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                  Prueba nuestro nuevo mix de frutos energéticos
                </h2>
                <p className="text-nut-200 mb-6">
                  Una combinación perfecta de nueces, almendras, castañas y pasas para darte la energía que necesitas durante todo el día.
                </p>
                <Link to="/productos/mix">
                  <Button className="bg-white text-nut-800 hover:bg-nut-100">
                    Conocer más
                  </Button>
                </Link>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1567892737950-30c7c8e1c863?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Mix Energético" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16 bg-nut-50">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nut-700"></div>
              </div>
            ) : (
              <ProductList products={newProducts} title="Recién llegados" />
            )}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-12 text-center">
              Lo que dicen nuestros clientes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border border-nut-100 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" className="mr-1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-nut-600 mb-4">
                  "Los mejores frutos secos que he probado. La calidad es excepcional y el envío fue muy rápido. Totalmente recomendado."
                </p>
                <div className="font-medium">María González</div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-nut-100 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" className="mr-1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-nut-600 mb-4">
                  "Me encanta el mix energético. Lo llevo siempre conmigo para mis entrenamientos y me da la energía que necesito."
                </p>
                <div className="font-medium">Carlos Rodríguez</div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-nut-100 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" className={i < 4 ? "mr-1" : "mr-1 text-gray-300"}>
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-nut-600 mb-4">
                  "Excelente servicio al cliente. Tuve un problema con mi pedido y lo solucionaron inmediatamente. Muy profesionales."
                </p>
                <div className="font-medium">Laura Pérez</div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-nut-100">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <h2 className="font-playfair text-2xl font-bold mb-4">
                Suscríbete a nuestro newsletter
              </h2>
              <p className="text-nut-600 mb-6">
                Recibe ofertas exclusivas, recetas y consejos sobre frutos secos.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Tu email" 
                  className="flex-grow rounded-l-lg border-nut-200 focus:border-nut-400 focus:ring focus:ring-nut-200 focus:ring-opacity-50"
                />
                <Button className="rounded-l-none bg-nut-700 hover:bg-nut-800">
                  Suscribirse
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
