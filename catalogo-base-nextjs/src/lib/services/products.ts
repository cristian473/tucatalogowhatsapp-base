'use server'

import { supabase } from '@/lib/supabase/client';
import { getCatalogId } from '@/utils/cookies';

export async function searchProducts(searchTerm: string) {
  const catalogId = await getCatalogId();

  
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      category:category_id (
        id,
        name
      )
    `)
    .eq('catalog_id', catalogId)
    .ilike('name', `%${searchTerm}%`)
    .order('name', { ascending: true });

  if (error) {
      console.error('Error al buscar productos:', error);
      return [];
  }
  
  return products;
}

export async function getProducts(filters: {
  is_featured?: boolean;
  category_id?: string;
  categories?: string[];
  search?: string;
  is_active?: boolean;
  min_price?: string | number;
  max_price?: string | number;
  in_stock?: boolean;
  sort?: string;
  limit?: number;
} = {}) {
  const catalogId = await getCatalogId();
  
  let query = supabase
    .from('products')
    .select('*, category:category_id(*)')
    .eq('catalog_id', catalogId);
  
  if (filters.is_featured !== undefined) {
    query = query.eq('is_featured', filters.is_featured);
  }
  
  if (filters.category_id) {
    query = query.eq('category_id', filters.category_id);
  }

  if (filters.categories) {
    query = query.in('category_id', filters.categories);
  }

  if (filters.search) {
    query = query.ilike('name', `%${filters.search.toLowerCase()}%`);
  }

  if (filters.is_active !== undefined) {
    query = query.eq('is_active', filters.is_active);
  }
  
  if (filters.min_price !== undefined) {
    query = query.gte('price', Number(filters.min_price));
  }
  
  if (filters.max_price !== undefined) {
    query = query.lte('price', Number(filters.max_price));
  }
  
  if (filters.in_stock) {
    query = query.gt('stock', 0);
  }
  
  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  if (filters.sort) {
    switch (filters.sort) {
      case 'price-low':
        query = query.order('price', { ascending: true });
        break;
      case 'price-high':
        query = query.order('price', { ascending: false });
        break;
      case 'name':
        query = query.order('name', { ascending: true });
        break;
      default:
        break;
    }
  } else {
    query = query
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
  }

  const { data, error } = await query;
  
  if (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
  
  return data;
}

export async function getProductById(id: string): Promise<Product | null> {
  const catalogId = await getCatalogId();
  
  const { data, error } = await supabase
    .from('products')
    .select('*, category:category_id(*)')
    .eq('catalog_id', catalogId)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error al obtener producto:', error);
    return null;
  }
  
  return data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const catalogId = await getCatalogId();
  
  const { data, error } = await supabase
    .from('products')
    .select('*, category:category_id(*)')
    .eq('catalog_id', catalogId)
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error al obtener producto:', error);
    return null;
  }
  
  return data;
}

export async function getMaxPriceProduct(): Promise<{
  max: {
      price: any;
  }[];
} | null> {
  const catalogId = await getCatalogId();

  const { data, error } = await supabase
    .from('products')
    .select('max(price)')
    .eq('catalog_id', catalogId)
    .eq('is_active', true)
    .single();

    if (error) {
      console.error('Error al obtener el precio máximo:', error);
      return null;
    }

    return data;
}
  
