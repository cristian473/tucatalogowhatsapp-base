
import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "./ProductCard";
import { Command, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

interface ProductSearchResultsProps {
  results: Product[];
  isLoading: boolean;
  onSelect: () => void;
  searchTerm: string;
}

const ProductSearchResults: React.FC<ProductSearchResultsProps> = ({
  results,
  isLoading,
  onSelect,
  searchTerm
}) => {
  const navigate = useNavigate();

  const handleSelect = (product: Product) => {
    navigate(`/producto/${product.id}`);
    onSelect();
  };

  if (searchTerm.length < 2) {
    return (
      <Command className="rounded-lg border shadow-md">
        <CommandEmpty>Ingrese al menos 2 caracteres para buscar</CommandEmpty>
      </Command>
    );
  }

  return (
    <Command className="rounded-lg border shadow-md">
      {isLoading ? (
        <CommandEmpty>Buscando productos...</CommandEmpty>
      ) : results.length === 0 ? (
        <CommandEmpty>No se encontraron productos</CommandEmpty>
      ) : (
        <CommandGroup heading="Productos">
          {results.map((product) => (
            <CommandItem
              key={product.id}
              onSelect={() => handleSelect(product)}
              className="flex items-center gap-2 p-2 cursor-pointer"
            >
              <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow overflow-hidden">
                <div className="font-medium text-sm truncate">{product.name}</div>
                <div className="text-xs text-muted-foreground">
                  {product.presentation || product.category}
                </div>
              </div>
              <div className="text-sm font-medium">
                ${product.discount && product.discount > 0
                  ? (product.price - (product.price * product.discount / 100))
                  : product.price}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      )}
    </Command>
  );
};

export default ProductSearchResults;
