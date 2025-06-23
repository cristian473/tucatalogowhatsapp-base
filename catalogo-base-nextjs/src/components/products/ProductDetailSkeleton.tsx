export default function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded-full w-4"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image skeleton */}
        <div className="aspect-square bg-gray-200 rounded-lg w-full"></div>
        
        {/* Product info skeleton */}
        <div className="space-y-6">
          {/* Title */}
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          
          {/* Price */}
          <div className="flex items-center gap-4">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
            <div className="h-6 bg-gray-200 rounded w-24"></div>
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
          
          {/* Variants */}
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-40"></div>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded-md w-20"></div>
              ))}
            </div>
          </div>
          
          {/* Quantity selector */}
          <div className="flex items-center gap-4">
            <div className="h-12 bg-gray-200 rounded w-32"></div>
            <div className="h-12 bg-gray-200 rounded w-40"></div>
          </div>
          
          {/* Add to cart button */}
          <div className="h-12 bg-gray-200 rounded-md w-full"></div>
        </div>
      </div>
      
      {/* Related products section */}
      <div className="mt-16 space-y-6">
        <div className="h-8 bg-gray-200 rounded w-64"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-square bg-gray-200 rounded-lg w-full"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
