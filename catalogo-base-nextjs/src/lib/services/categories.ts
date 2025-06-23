import { Category } from '@/types/product';
import { getCatalogId } from '@/utils/cookies';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

/**
 * Obtiene todas las categorías del catálogo actual
 */
export async function getCategories() {
  const catalogId = await getCatalogId();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('catalog_id', catalogId)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error al obtener categorías:', error);
    return [];
  }
  
  return data as Category[];
}

/**
 * Obtiene una categoría por su ID
 */
export async function getCategoryById(categoryId: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', categoryId)
    .single();
  
  if (error) {
    console.error('Error al obtener categoría:', error);
    return null;
  }
  
  return data as Category;
}

/**
 * Obtiene todas las presentaciones únicas de productos
 */
export async function getPresentations() {
  const catalogId = await getCatalogId();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data, error } = await supabase
    .from('products')
    .select('presentation')
    .eq('catalog_id', catalogId)
    .eq('is_active', true)
    .not('presentation', 'is', null);
  
  if (error) {
    console.error('Error al obtener presentaciones:', error);
    return [];
  }
  
  // Extraer presentaciones únicas
  const presentations = [...new Set(data.map(item => item.presentation))];
  return presentations.filter(Boolean);
}
