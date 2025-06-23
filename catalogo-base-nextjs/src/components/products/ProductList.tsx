'use server'

import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts } from "@/lib/services/products";

interface ProductListCatalogProps {
  products: Product[];
}

async function ProductListCatalogContent({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) {
  console.log(searchParams)
  // Extraer parámetros de búsqueda
  const categoryParam = searchParams.category as string | undefined;
  const presentationParam = searchParams.presentation as string | undefined;
  const search = searchParams.search as string | undefined;
  const min_price = searchParams.minPrice as string | undefined;
  const max_price = searchParams.maxPrice as string | undefined;
  const in_stock = searchParams.inStock === 'true';
  const sort = searchParams.sort as string | undefined;
  
  // Convertir parámetros a formato adecuado
  const categories = categoryParam?.split(',').filter(Boolean);
  const presentations = presentationParam?.split(',').filter(Boolean);
  
  // Cargar productos filtrados
  const products = await getProducts({
    categories,
    // presentations,
    search,
    min_price,
    max_price,
    in_stock,
    sort
  });

  return (
    <div className="lg:col-span-3">
      {products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-nut-600">No se encontraron productos que coincidan con los filtros seleccionados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

// Componente de skeleton para el estado de carga
function ProductListCatalogSkeleton() {
  return (
    <div className="lg:col-span-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-lg border border-nut-100 overflow-hidden">
            <Skeleton className="w-full h-48" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-5 w-1/2 mb-4" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function ProductListCatalog({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Suspense fallback={<ProductListCatalogSkeleton />}>
      <ProductListCatalogContent searchParams={searchParams} />
    </Suspense>
  )
}