"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import SumRestQtyInput from "./atom/SumRestQtyInput";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";

export default function ProductSumRestQty({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState<string>('1');
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    const qty = Number(quantity);
    if (qty <= 0) return;
    
    // Agregar al carrito con la cantidad especificada
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: qty,
      image: product.featured_image_url,
      discount: product.discount
    });
    
    toast({
      title: "Producto agregado",
      description: `${quantity} x ${product?.name} ha sido agregado al carrito`,
    });
  };
  return (
    <>
      <div className="mb-6">
        <label htmlFor="quantity" className="block mb-2 font-medium text-nut-700">
          Cantidad
        </label>
        <SumRestQtyInput
          setQuantity={setQuantity}
          quantity={quantity}
          disabled={product.stock === 0}
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <Button 
          onClick={handleAddToCart}
          className="bg-primary hover:bg-primary/80 text-primary-foreground px-8 py-6 text-base"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Agregar al carrito
        </Button>
      </div>
    </>
  )
}