
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/components/ProductCard";

export async function searchProducts(searchTerm: string): Promise<Product[]> {
  if (!searchTerm || searchTerm.trim().length < 2) return [];
  
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
    .ilike('name', `%${searchTerm}%`)
    .limit(5);

  if (error) {
    console.error("Error searching products:", error);
    return [];
  }

  return data.map(product => ({
    id: product.id, // Keep ID as string as returned by Supabase
    name: product.name,
    price: product.price,
    image: product.image || "https://images.unsplash.com/photo-1628697189445-40c1db871df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: product.categories?.name || "Sin categoría",
    stock: product.stock,
    discount: product.discount,
    presentation: product.presentation
  }));
}
