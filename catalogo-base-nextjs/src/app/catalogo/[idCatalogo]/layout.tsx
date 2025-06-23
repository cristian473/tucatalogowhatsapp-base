import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCatalogoLayoutInfo } from '@/lib/services/catalog';
import { getProducts } from '@/lib/services/products';
import ClientWrapper from '@/client/wrapper';

interface CatalogoLayoutProps {
  children: ReactNode;
  params: Promise<{ idCatalogo: string }>;
}

export default async function CatalogoLayout({ children, params }: CatalogoLayoutProps) {
  const { idCatalogo } = await params;
  const catalogo = await getCatalogoLayoutInfo(idCatalogo);
  const topProducts = await getProducts({ is_featured: true, limit: 4 });

  if (!catalogo) {
    // Manejar el caso donde no se encuentra el catálogo
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Catálogo no encontrado</h1>
        <p>Lo sentimos, el catálogo que estás buscando no existe o ha sido eliminado.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ClientWrapper>
        <Header catalog={catalogo} />
      </ClientWrapper>
      
      <main className="flex-grow">
        {children}
      </main>

      <Footer catalog={catalogo} topProducts={topProducts} />
    </div>
  );
}
