import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, Minus, Plus, ChevronLeft } from "lucide-react";
import { Product } from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  // Get product data using React Query
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      // Ensure we have a valid ID to query with
      if (!id) throw new Error("Invalid product ID");
      
      console.log("Fetching product with ID:", id);
      
      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          price,
          image,
          stock,
          discount,
          presentation,
          description,
          category_id,
          categories:category_id (name)
        `)
        .eq("id", id)
        .maybeSingle(); // Use maybeSingle instead of single to prevent errors when no data is found
      
      if (error) {
        console.error("Error fetching product:", error);
        throw error;
      }
      
      if (!data) {
        throw new Error("Product not found");
      }
      
      // Format product for use with our component
      return {
        id: data.id,
        name: data.name,
        price: data.price,
        image: data.image || "https://images.unsplash.com/photo-1628697189445-40c1db871df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: data.categories?.name || "Sin categoría",
        stock: data.stock,
        discount: data.discount,
        presentation: data.presentation,
        description: data.description,
        category_id: data.category_id
      };
    }
  });
  
  // Get related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (product && product.category_id) {
        const { data, error } = await supabase
          .from("products")
          .select(`
            id,
            name,
            price,
            image,
            stock,
            discount,
            presentation,
            categories:category_id (name)
          `)
          .eq("category_id", product.category_id)
          .neq("id", product.id)
          .limit(4);
          
        if (!error && data) {
          // Format products for our component - make sure we're mapping IDs as strings
          const formatted: Product[] = data.map(item => ({
            id: String(item.id), // Ensure ID is a string
            name: item.name,
            price: item.price,
            image: item.image || "https://images.unsplash.com/photo-1628697189445-40c1db871df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: item.categories?.name || "Sin categoría",
            stock: item.stock,
            discount: item.discount,
            presentation: item.presentation
          }));
          
          setRelatedProducts(formatted);
        }
      }
    };
    
    fetchRelatedProducts();
  }, [product]);

  // Reset quantity when product changes
  useEffect(() => {
    setQuantity(1);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <div className="animate-spin h-12 w-12 border-4 border-nut-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="font-playfair text-2xl mb-4">Cargando producto</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    console.error("Product detail error:", error);
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="font-playfair text-2xl mb-4">Producto no encontrado</h2>
            <p className="text-nut-500 mb-4">El producto con ID "{id}" no existe o ha sido eliminado.</p>
            <Link to="/productos" className="text-nut-700 hover:underline">
              Volver a productos
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1 || (product.stock && newQuantity > product.stock)) {
      return;
    }
    setQuantity(newQuantity);
  };

  const addToCart = () => {
    toast({
      title: "Producto agregado",
      description: `${quantity} x ${product.name} ha sido agregado al carrito`,
    });
  };

  const hasDiscount = product.discount && product.discount > 0;
  const finalPrice = hasDiscount 
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <div className="flex items-center text-sm text-nut-500">
              <Link to="/" className="hover:text-nut-700">Inicio</Link>
              <span className="mx-2">/</span>
              <Link to="/productos" className="hover:text-nut-700">Productos</Link>
              <span className="mx-2">/</span>
              <span className="text-nut-800 font-medium truncate">{product.name}</span>
            </div>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Product Image */}
            <div className="overflow-hidden rounded-lg bg-white border border-nut-100 p-4">
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            {/* Product Info */}
            <div>
              <Link to="/productos" className="inline-flex items-center text-nut-600 hover:text-nut-800 mb-4">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Volver a productos
              </Link>
              <div className="text-sm text-nut-500 uppercase mb-2">{product.category}</div>
              <h1 className="font-playfair text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-bold text-nut-800">${finalPrice.toLocaleString()}</span>
                {hasDiscount && (
                  <>
                    <span className="ml-3 text-xl text-nut-400 line-through">${product.price.toLocaleString()}</span>
                    <span className="ml-3 bg-red-100 text-red-700 text-sm font-semibold px-2 py-0.5 rounded">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              <div className="mb-6">
                <div className="text-nut-600 mb-4">
                  {product.description || "Sin descripción disponible para este producto."}
                </div>

                <div className={`inline-block px-3 py-1 rounded text-sm font-medium ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.stock > 0 ? `${product.stock} unidades disponibles` : 'Últimos'}
                </div>
              </div>

              <hr className="my-6 border-nut-100" />

              <div className="mb-6">
                <label htmlFor="quantity" className="block mb-2 font-medium text-nut-700">
                  Cantidad
                </label>
                <div className="flex w-32 border border-nut-200 rounded-md overflow-hidden">
                  <button 
                    className="px-3 py-2 bg-nut-100 text-nut-500 hover:bg-nut-200 disabled:opacity-50"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-full text-center focus:outline-none focus:ring-0 border-0"
                    min="1"
                    max={product.stock}
                  />
                  <button 
                    className="px-3 py-2 bg-nut-100 text-nut-500 hover:bg-nut-200 disabled:opacity-50"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={product.stock && quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <Button 
                  onClick={addToCart}
                  className="bg-nut-700 hover:bg-nut-800 text-white px-8 py-6 text-base"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Agregar al carrito
                </Button>
                <Button 
                  variant="outline" 
                  className="border-nut-300 text-nut-700 hover:bg-nut-50 px-8 py-6 text-base"
                >
                  Comprar ahora
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-nut-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-nut-500">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  Almacenamiento en frío para mayor frescura
                </div>
                <div className="flex items-center text-nut-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-nut-500">
                    <path d="M21.73 18.04l-4.243-4.243-2.83 2.83 4.243 4.243a2 2 0 1 0 2.83-2.83z"></path>
                    <path d="M11 4.062a6 6 0 1 0 5.526 9.93"></path>
                    <path d="M14.83 9.34a4 4 0 1 0-5.66 5.66"></path>
                  </svg>
                  Origen seleccionado cuidadosamente
                </div>
                <div className="flex items-center text-nut-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-nut-500">
                    <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                    <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                    <path d="M12 20h.01"></path>
                  </svg>
                  Envío rápido para preservar frescura
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-6">
                También te puede interesar
              </h2>
              <ProductList products={relatedProducts} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
