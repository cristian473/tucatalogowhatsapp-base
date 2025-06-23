'use server'

import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { saveCatalogId } from "@/utils/cookies";

export async function getFullCatalogoById(idCatalogo: string): Promise<Catalog> {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    const { data } = await supabase
      .from('catalogs')
      .select(`
        *,
        products:products (
          *,
          category:category_id (
            id,
            name
          )
        ),
        categories:categories (
          *
        )
      `)
      .eq('id', idCatalogo)
      .single();

    return data;
  } catch (error) {
    console.error('Error al cargar catálogos:', error);
    throw error;
  }
}

export async function getCatalogoLayoutInfo(idCatalogo: string): Promise<Catalog> {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    const { data } = await supabase
      .from('catalogs')
      .select(`
        *,
        categories:categories (
          *
        )
      `)
      .limit(4, { foreignTable: 'categories' })
      .eq('id', idCatalogo)
      .single();

    if(!data) {
      throw new Error('Catálogo no encontrado');
    }
    return data;
  } catch (error) {
    console.error('Error al cargar catálogos:', error);
    throw error;
  }
}
  