
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";

export interface Product {
  id: string | number; // Supports both string and number types
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  discount?: number;
  presentation?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const isMobile = useIsMobile();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product);
    
    toast({
      title: "Producto agregado",
      description: `${product.name} ha sido agregado al carrito`,
    });
  };

  const hasDiscount = product.discount && product.discount > 0 ? product.discount : '';
  const finalPrice = hasDiscount 
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  // Aseguramos usar el formato español argentino para los precios
  const formattedFinalPrice = finalPrice.toLocaleString("es-AR");
  const formattedOriginalPrice = product.price.toLocaleString("es-AR");

  // Ensure product.id is properly converted to string
  const productId = String(product.id);

  return (
    <Link to={`/producto/${productId}`} className="product-card block bg-white rounded-lg overflow-hidden border border-nut-100 h-full">
      <div className="product-image-container aspect-square relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image w-full h-full object-cover"
        />
        {hasDiscount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{product.discount}%
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-xs text-nut-500 uppercase mb-1">{product.category}</div>
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
          <Button
            size="sm"
            className="bg-nut-700 hover:bg-nut-800"
            disabled={product.stock === 0}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            {isMobile ? (
              <Plus className="h-4 w-4" />
            ) : (
              <span className="ml-1">Agregar</span>
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

