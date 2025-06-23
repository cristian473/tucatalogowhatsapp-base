
'use server'

import Link from 'next/link'
import ClientWrapper from '@/client/wrapper';
import AddToCartButton from './atom/AddToCartProductCardButton';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const hasDiscount = product.discount && product.discount > 0 ? product.discount : '';
  const finalPrice = hasDiscount 
    ? product.price - (product.price * (product.discount || 100) / 100)
    : product.price;

  // Aseguramos usar el formato español argentino para los precios
  const formattedFinalPrice = finalPrice.toLocaleString("es-AR");
  const formattedOriginalPrice = product.price.toLocaleString("es-AR");

  return (
    <Link href={`/producto/${product.slug}`} className="product-card block bg-white rounded-lg overflow-hidden border border-nut-100 h-full">
      <div className="product-image-container aspect-square relative">
        <img 
          src={product.featured_image_url} 
          alt={product.name} 
          className="product-image w-full h-full object-cover"
        />
        {hasDiscount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{product.compare_at_price}%
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-xs text-nut-500 uppercase mb-1">{product.category.name}</div>
        <h3 className="font-medium text-nut-800 mb-2 line-clamp-2 h-12">{product.name}</h3>
        {product.presentation && (
          <div className="text-xs text-nut-600 mb-2">
            {product.presentation}
          </div>
        )}
        <div className="flex items-baseline mb-3">
          <span className="text-lg font-bold text-nut-800">${formattedFinalPrice}</span>
          {hasDiscount && (
            <span className="ml-2 text-sm text-nut-400 line-through">${formattedOriginalPrice}</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? 'En stock' : 'Sin stock'}
          </div>
          <ClientWrapper>
            <AddToCartButton product={product} />
          </ClientWrapper>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

