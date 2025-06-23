'use server'

import { Suspense } from "react";
import { getProducts } from "@/lib/services/products"
import ProductList from "./ProductList";
import { Button } from "./ui/button";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

// Skeleton loader for products
function ProductListSkeleton() {
  return (
    <div>
      <div className="h-8 w-64 mb-6">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-40 w-full rounded-md" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

async function ProductsContent({section}: ProductsSectionProps) {
  let products: Product[] = [];

  if(section === 'featured') {
    products = await getProducts({ is_featured: true, limit: 4 });
  }

  if(section === 'new') {
    products = await getProducts({ limit: 4 });
  }
  
  return (
    <>
      {products && products.length > 0 ? (
        <>
          <ProductList products={products} title="Productos destacados" />
          <div className="text-center mt-10">
            <Link href="/productos">
              <Button variant="outline" className="border-nut-700 text-nut-700 hover:bg-nut-50">
                Ver todos los productos
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <p>No hay productos disponibles</p>
      )}
    </>
  );
}

type ProductsSectionProps = {
  section: 'featured' | 'new' | 'best-sellers';
}

export default async function ProductsSection({section}: ProductsSectionProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductsContent section={section} />
        </Suspense>
      </div>
    </section>
  )
}
