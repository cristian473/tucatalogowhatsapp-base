'use server'

import { cookies } from "next/headers";
import { createClient } from "../supabase/server";

export async function getCatalogByCustomDomain(domain: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore)
  const { data } = await supabase
    .from('catalogs')
    .select(`
      *
    `)
    .eq('custom_domain', domain)
    .single();
  
  return data;
}

export async function getCatalogIdByCustomDomain(domain: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore)
  const { data } = await supabase
    .from('catalogs')
    .select(`id, custom_domain`)
    .eq('custom_domain', domain)
    .single();
  
  return data;
}

export async function getCatalogBySlug(slug: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore)
  const { data } = await supabase
    .from('catalogs')
    .select(`
      *
    `)
    .eq('slug', slug)
    .single();
  
  return data;
}

export async function getCatalogIdBySlug(slug: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore)
  const { data } = await supabase
    .from('catalogs')
    .select(`id, slug`)
    .eq('slug', slug)
    .single();
  
  return data;
}