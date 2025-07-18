
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductsSection from "@/components/ProductsSection";
import { getCatalogId } from "@/utils/cookies";
import { getCatalogoLayoutInfo } from "@/lib/services/catalog";
import { redirect } from "next/navigation";

export default async function Index () {
  const idCatalogo = await getCatalogId();
  
  // Redireccionar si no hay idCatalogo
  if (!idCatalogo) {
    redirect('/not-found');
  }
  
  const catalogo = await getCatalogoLayoutInfo(idCatalogo);
  
  return (
    <>
      <section className="relative bg-[url('/lovable-uploads/2e463fb1-c181-4f9f-881a-8ae2fa36bf44.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-nut-800/30 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 py-24 md:py-5 relative z-10">
          <div className="flex items-center justify-between">
            <div className="hidden md:block md:w-1/3 flex justify-end">
              <img 
                src={catalogo.logo_url ?? '/default-logo.png'}
                alt={`${catalogo.name} Logo`}
                className="w-80 h-auto opacity-70 drop-shadow-2xl"
              />
            </div>
            <div className="text-center md:text-center md:w-2/3">
              <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4">
                Los mejores frutos secos
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl">
                Seleccionados cuidadosamente para ofrecerte calidad premium y sabor excepcional
              </p>
              <Link href="/productos">
                <Button className="bg-nut-700 hover:bg-nut-800 text-lg px-8 py-6">
                  Ver catálogo
                </Button>
              </Link>
            </div>
            
            {/* Logo overlay on the right */}
            <div className="hidden md:block md:w-1/3 flex justify-end">
              <img 
                src="/logo-mana.png" 
                alt="Maná frutos-secos Logo" 
                className="w-80 h-auto opacity-70 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products (skipping the Features section) */}
      <ProductsSection section="featured" />

      {/* Walnut Benefits Section */}
      <section className="py-16 bg-nut-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-nut-800">
                Los beneficios de las nueces Mariposa
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">✓</span>
                  <p className="text-nut-700">Ricas en Omega-3 que ayuda a reducir colesterol.</p>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">✓</span>
                  <p className="text-nut-700">Consumir nueces reduce riesgo de padecer cáncer y otras enfermedades coronarias.</p>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">✓</span>
                  <p className="text-nut-700">Buenas para la memoria y prevenir enfermedades como el Alzheimer</p>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">✓</span>
                  <p className="text-nut-700">Contribuyen a equilibrar peso y mantener intestino en perfectas condiciones.</p>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">✓</span>
                  <p className="text-nut-700">Ayuda a reducir enfermedades cardiovasculares.</p>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">✓</span>
                  <p className="text-nut-700">Beneficiosas para el sistema nervioso.</p>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">✓</span>
                  <p className="text-nut-700">Contienen polifenoles, los cuales tienen efectos antioxidantes.</p>
                </li>
              </ul>
              <div className="mt-6 flex justify-center md:justify-start">
                <Link href="/productos?category=Nueces">
                  <Button className="bg-nut-700 text-white hover:bg-nut-800">
                    Ver productos de nueces Mariposa
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/6832abab-06f6-4f61-bc35-3ad4041072ad.png" 
                alt="Nueces Mariposa" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <ProductsSection section="new" />

      {/* Testimonials - COMMENTED OUT FOR NOW */}
      {/*
      <section className="py-16 bg-nut-50">
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
      */}
    </>
  );
};