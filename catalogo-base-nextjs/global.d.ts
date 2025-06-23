declare global {
  interface Catalog {
    id: string;
    name: string;
    slug: string;
    description: string;
    logo_url: string | null;
    banner_url: string | null;
    currency: string;
    timezone: string;
    business_phone: string | null;
    business_email: string | null;
    business_address: string | null;
    whatsapp_number: string | null;
    whatsapp_message_template: string;
    custom_domain: string | null;
    domain_verified: boolean;
    primary_color: string;
    secondary_color: string;
    font_family: string;
    is_active: boolean;
    is_published: boolean;
    created_at: string;
    updated_at: string;
    products: Product[];
    categories: Category[];
  }

  interface Product {
    id: string;
    catalog_id: string;
    category_id: string;
    name: string;
    slug: string;
    description: string;
    short_description: string;
    price: number;
    compare_at_price: number | null;
    cost_price: number | null;
    stock: number;
    track_inventory: boolean;
    allow_backorders: boolean;
    presentation: string | null;
    discount: number | null;
    weight: number | null;
    dimensions: string | null;
    featured_image_url: string;
    images: string[] | null;
    meta_title: string | null;
    meta_description: string | null;
    is_active: boolean;
    is_featured: boolean;
    is_digital: boolean;
    requires_shipping: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
    category: Category;
  }

  interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    created_at: string;
    updated_at: string;
  }
}
export {};