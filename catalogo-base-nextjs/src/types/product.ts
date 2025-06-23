export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  category_id?: string;
  category_name?: string;
  featured_image_url?: string;
  images?: string[];
  is_featured?: boolean;
  is_active?: boolean;
  stock?: number;
  presentation?: string;
  created_at?: string;
  updated_at?: string;
  sort_order?: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  is_active?: boolean;
  sort_order?: number;
}

export interface Catalog {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
  banner_url?: string;
  primary_color?: string;
  secondary_color?: string;
  whatsapp_number?: string;
  instagram_username?: string;
  facebook_username?: string;
  is_active?: boolean;
}
