import { getMaxPriceProduct } from "@/lib/services/products";
import { getCategories } from "@/lib/services/categories";
import { ProductFiltersTop, ProductFiltersLeft } from "@/components/products/ProductFilters";
import ProductList from "@/components/products/ProductList";

interface ProductsProps {
  params: Promise<{
    idCatalogo: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Products({ searchParams }: ProductsProps) {
  // Cargar datos necesarios para los filtros
  const categories = await getCategories();
  const presentations: string[] = [];
  
  // Encontrar el precio máximo para el slider
  const maxPriceProduct = await getMaxPriceProduct();
  const maxPrice = maxPriceProduct?.max[0]?.price || 100000;
  const searchParamsResolved = await searchParams;
  
  return (
    <section className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-8">
        Nuestros Productos
      </h1>
      
      {/* Search and Filter Controls */}
      <ProductFiltersTop />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <ProductFiltersLeft 
          categories={categories as Category[]}
          presentations={presentations}
          maxPrice={maxPrice}
        />
        
        <ProductList searchParams={searchParamsResolved} />
      </div>
    </section>
  );
};
