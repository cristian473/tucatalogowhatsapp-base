
import ProductCard, { Product } from "./ProductCard";

interface ProductListProps {
  products: Product[];
  title?: string;
  emptyMessage?: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, title, emptyMessage = "No hay productos disponibles" }) => {
  return (
    <div>
      {title && (
        <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-6">{title}</h2>
      )}
      
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-nut-600">{emptyMessage}</div>
      )}
    </div>
  );
};

export default ProductList;
