import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Filtros superiores skeleton */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="w-full md:w-64">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </div>
      </div>

      {/* Contenido principal con filtros laterales y productos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filtros laterales skeleton */}
        <div className="hidden md:block">
          <div className="space-y-6">
            {/* Categorías */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-24 rounded" />
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-5 w-full rounded" />
                ))}
              </div>
            </div>
            
            {/* Presentaciones */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-32 rounded" />
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-5 w-full rounded" />
                ))}
              </div>
            </div>
            
            {/* Precio */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-16 rounded" />
              <Skeleton className="h-10 w-full rounded" />
              <div className="flex justify-between">
                <Skeleton className="h-5 w-12 rounded" />
                <Skeleton className="h-5 w-12 rounded" />
              </div>
            </div>
            
            {/* Stock */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-16 rounded" />
              <Skeleton className="h-6 w-full rounded" />
            </div>
          </div>
        </div>
        
        {/* Productos skeleton */}
        <div className="col-span-1 md:col-span-3">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array(12).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 p-3">
                <Skeleton className="h-40 w-full rounded-md mb-3" />
                <Skeleton className="h-5 w-3/4 rounded mb-2" />
                <Skeleton className="h-6 w-1/2 rounded mb-3" />
                <Skeleton className="h-8 w-full rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
