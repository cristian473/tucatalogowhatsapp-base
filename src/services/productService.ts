import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/components/ProductCard";
import { shuffleArray } from "@/lib/utils";

export async function getFeaturedProducts(): Promise<Product[]> {
  // Get featured products first
  const { data: featuredProducts, error: featuredError } = await supabase
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
    .eq("featured", true)
    .gt("stock", 0);

  if (featuredError) {
    console.error("Error fetching featured products:", featuredError);
    return [];
  }
  
  let formatted = formatProductsFromSupabase(featuredProducts || []);
  
  // If we have less than 4 featured products, get random products with stock to fill
  if (formatted.length < 4) {
    const { data: regularProducts, error: regularError } = await supabase
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
      .eq("featured", false)
      .gt("stock", 0);

    if (!regularError && regularProducts) {
      const randomProducts = shuffleArray(regularProducts)
        .slice(0, 4 - formatted.length);
      
      formatted = [...formatted, ...formatProductsFromSupabase(randomProducts)];
    }
  }

  return formatted;
}

export async function getLatestProducts(): Promise<Product[]> {
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
      categories:category_id (name),
      created_at
    `)
    .order("created_at", { ascending: false })
    .limit(20); // Increased limit to have more products to filter from

  if (error) {
    console.error("Error fetching latest products:", error);
    return [];
  }

  const formattedProducts = formatProductsFromSupabase(data || []);
  
  // Filter out duplicates by name, keeping only the first occurrence (most recent)
  const uniqueProducts = formattedProducts.filter((product, index, array) => 
    array.findIndex(p => p.name === product.name) === index
  );

  // Return only 4 unique products
  return uniqueProducts.slice(0, 4);
}

function formatProductsFromSupabase(products: any[]): Product[] {
  return products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image || "https://images.unsplash.com/photo-1628697189445-40c1db871df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: product.categories?.name || "Sin categoría",
    stock: product.stock,
    discount: product.discount,
    presentation: product.presentation
  }));
}
