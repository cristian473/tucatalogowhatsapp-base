import ProductList from "@/components/ProductList";
import { ChevronLeft } from "lucide-react";
import { getProductBySlug } from "@/lib/services/products";
import ProductSumRestQty from "@/components/ProductDetailSumRestQty";
import ClientWrapper from "@/client/wrapper";
import Link from "next/link";

interface ProductDetailProps {
  params: Promise<{ slugProduct: string }>
}

const ProductNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-nut-100 rounded-full flex items-center justify-center mb-4">
        <ChevronLeft className="text-nut-500 h-8 w-8" />
      </div>
      <h1 className="text-2xl font-bold text-nut-800 mb-3">Producto no encontrado</h1>
      <p className="text-nut-600 mb-6 max-w-md">Lo sentimos, el producto que estás buscando no está disponible o ha sido removido del catálogo.</p>
      <Link href="../productos" className="bg-nut-700 hover:bg-nut-800 text-white font-medium py-2 px-6 rounded-md transition-colors">
        Ver todos los productos
      </Link>
    </div>
  );
};


export default async function ProductDetail({params}: ProductDetailProps){
  const { slugProduct } = await params;
  const product = await getProductBySlug(slugProduct);
  if(!product) {
    return <ProductNotFound />
  }

  const relatedProducts:Product[] = [];
  // const [productVariants, setProductVariants] = useState<Product[]>([]);
  
  // // Get product variants (same name, different presentations)
  // useEffect(() => {
  //   const fetchProductVariants = async () => {
  //     if (product && product.name) {
  //       const { data, error } = await supabase
  //         .from("products")
  //         .select(`
  //           id,
  //           name,
  //           price,
  //           image,
  //           stock,
  //           discount,
  //           presentation,
  //           description,
  //           category_id,
  //           categories:category_id (name)
  //         `)
  //         .eq("name", product.name)
  //         .gt("stock", 0); // Only show variants with stock
          
  //       if (!error && data) {
  //         const formatted: Product[] = data.map(item => ({
  //           id: String(item.id), // Ensure ID is converted to string
  //           name: item.name,
  //           price: item.price,
  //           image: item.image || "https://images.unsplash.com/photo-1628697189445-40c1db871df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //           category: item.categories?.name || "Sin categoría",
  //           stock: item.stock,
  //           discount: item.discount,
  //           presentation: item.presentation,
  //           description: item.description,
  //           category_id: item.category_id
  //         }));
          
  //         // Sort variants by price from lowest to highest
  //         const sortedVariants = formatted.sort((a, b) => a.price - b.price);
  //         setProductVariants(sortedVariants);
  //       }
  //     }
  //   };
    
  //   fetchProductVariants();
  // }, [product]);
  
  // // Get related products
  // useEffect(() => {
  //   const fetchRelatedProducts = async () => {
  //     if (product && product.category_id) {
  //       const { data, error } = await supabase
  //         .from("products")
  //         .select(`
  //           id,
  //           name,
  //           price,
  //           image,
  //           stock,
  //           discount,
  //           presentation,
  //           categories:category_id (name)
  //         `)
  //         .eq("category_id", product.category_id)
  //         .neq("id", product.id)
  //         .neq("name", product.name) // Exclude variants of the same product
  //         .limit(4);
          
  //       if (!error && data) {
  //         // Format products for our component - make sure we're mapping IDs as strings
  //         const formatted: Product[] = data.map(item => ({
  //           id: String(item.id),
  //           name: item.name,
  //           price: item.price,
  //           image: item.image || "https://images.unsplash.com/photo-1628697189445-40c1db871df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //           category: item.categories?.name || "Sin categoría",
  //           stock: item.stock,
  //           discount: item.discount,
  //           presentation: item.presentation
  //         }));
          
  //         setRelatedProducts(formatted);
  //       }
  //     }
  //   };
    
  //   fetchRelatedProducts();
  // }, [product]);

  // // Reset quantity when product changes
  // useEffect(() => {
  //   setQuantity(1);
  // }, [id]);

  // Handle presentation change
  // const handlePresentationChange = (selectedProductId: string) => {
  //   window.scrollTo(0, 0);
  //   navigate(`/product/${selectedProductId.toString()}`);
  // };

  if (!product) {
    return (
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="font-playfair text-2xl mb-4">Producto no encontrado</h2>
          <p className="text-nut-500 mb-4">El producto no existe o ha sido eliminado.</p>
          <Link href="/productos" className="text-nut-700 hover:underline">
            Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  // const handleQuantityChange = (newQuantity: number) => {
  //   if (newQuantity < 1 || (product?.stock && newQuantity > product.stock)) {
  //     return;
  //   }
  //   setQuantity(newQuantity);
  // };

  // const handleAddToCart = () => {
  //   // Add product multiple times based on quantity
  //   for (let i = 0; i < quantity; i++) {
  //     addToCart(product);
  //   }
    
  //   toast({
  //     title: "Producto agregado",
  //     description: `${quantity} x ${product?.name} ha sido agregado al carrito`,
  //   });
  // };

  // const hasDiscount = product.discount && product.discount > 0? product.discount : '';
  // const finalPrice = hasDiscount 
  //   ? product.price - (product.price * product.discount / 100)
  //   : product.price;

  const hasDiscount = product.discount && product.discount > 0 ? product.discount : null;
  
  return (
    <section className="container mx-auto mt-4">
      {/* Breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center text-sm text-nut-500">
          <Link href="/" className="hover:text-nut-700">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/productos" className="hover:text-nut-700">Productos</Link>
          <span className="mx-2">/</span>
          <span className="text-nut-800 font-medium truncate">{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Image */}
        <div className="overflow-hidden rounded-lg bg-white border border-nut-100 p-4">
          <img 
            src={product.featured_image_url}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <Link href="/productos" className="inline-flex items-center text-nut-600 hover:text-nut-800 mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver a productos
          </Link>
          <div className="text-sm text-nut-500 uppercase mb-2">{product.category.name}</div>
          <h1 className="font-playfair text-3xl font-bold mb-4">{product.name}</h1>
          
          {/* {productVariants.length > 1 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-nut-700 mb-2">
                Presentación:
              </label>
              <Select value={String(id)} onValueChange={handlePresentationChange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {productVariants.map((variant) => (
                    <SelectItem key={variant.id} value={String(variant.id)}>
                      {variant.presentation || "Sin especificar"} - ${variant.price.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )} */}

          {/* Single Presentation Display */}
          {/* {productVariants.length <= 1 && product.presentation && ( */}
            <div className="inline-block px-3 py-1.5 bg-nut-50 text-nut-800 rounded-md font-medium mb-4">
              Presentación: Unidad
            </div>
          {/* )} */}
          
          <div className="flex items-baseline mb-6">
            <span className="text-3xl font-bold text-nut-800">${product.price.toLocaleString()}</span>
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
              {product.stock > 0 ? 'En stock' : 'Sin stock'}
            </div>
          </div>

          <hr className="my-6 border-nut-100" />
          
          <ClientWrapper>
            <ProductSumRestQty product={product} />
          </ClientWrapper>

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
    </section>
  );
};
