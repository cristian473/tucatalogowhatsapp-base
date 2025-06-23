'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/hooks/useCart';

export default function CartButton() {
  const { itemCount, toggleCartDrawer } = useCart();
  
  return (
    <Button 
      onClick={toggleCartDrawer}
      variant="ghost" 
      className="relative p-2"
    >
      <ShoppingCart className="h-6 w-6 text-nut-700" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  );
}
