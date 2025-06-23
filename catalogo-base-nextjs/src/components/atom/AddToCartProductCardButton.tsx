'use client'

import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import { Button } from "../ui/button";
import { Plus, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

function AddToCartButton({ product }: ProductCardProps) {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const isMobile = useIsMobile();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.featured_image_url
    });
    
    toast({
      title: "Producto agregado",
      description: `${product.name} ha sido agregado al carrito`,
    });
  };

  return (
    <Button
      size="sm"
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
  );
}

export default AddToCartButton;