
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
    // Ensure we're navigating with the full product ID
    navigate(`/producto/${product.id}`);
    onSelect();
  };

  if (searchTerm.length < 2) {
    return (
      <div className="rounded-lg border shadow-md bg-popover p-2">
        <p className="py-6 text-center text-sm">Ingrese al menos 2 caracteres para buscar</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border shadow-md bg-popover overflow-hidden">
      {isLoading ? (
        <p className="py-6 text-center text-sm">Buscando productos...</p>
      ) : results.length === 0 ? (
        <p className="py-6 text-center text-sm">No se encontraron productos</p>
      ) : (
        <div>
          <div className="px-2 py-3 font-medium text-xs text-muted-foreground">
            Productos
          </div>
          <div>
            {results.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelect(product)}
                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-sm mx-1"
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSearchResults;
