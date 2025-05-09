
import { Product } from "@/components/ProductCard";

export const products: Product[] = [
  {
    id: "1",
    name: "Nueces Peladas Premium",
    price: 1200,
    image: "https://images.unsplash.com/photo-1600189083288-747732714019?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Nueces",
    stock: 52,
    presentation: "500g"
  },
  {
    id: "2",
    name: "Almendras Naturales",
    price: 950,
    image: "https://images.unsplash.com/photo-1573851552177-7a81d0a798b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Almendras",
    stock: 38,
    discount: 10,
    presentation: "1kg"
  },
  {
    id: "3",
    name: "Mix Frutos Secos Gourmet",
    price: 850,
    image: "https://images.unsplash.com/photo-1628697189445-40c1db871df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Mix",
    stock: 25,
    presentation: "200g"
  },
  {
    id: "4",
    name: "Pistachos Tostados con Sal",
    price: 1500,
    image: "https://images.unsplash.com/photo-1574570757119-d556a6b5745b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    category: "Pistachos",
    stock: 18,
    presentation: "400g"
  },
  {
    id: "5",
    name: "Nueces de Brasil Orgánicas",
    price: 1350,
    image: "https://images.unsplash.com/photo-1573759089337-2b89599557c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Nueces",
    stock: 0,
    presentation: "300g"
  },
  {
    id: "6",
    name: "Castañas de Cajú Horneadas",
    price: 1100,
    image: "https://images.unsplash.com/photo-1648733870020-be56391ccda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Castañas",
    stock: 42,
    discount: 15,
    presentation: "200g"
  },
  {
    id: "7",
    name: "Mix Energético (Nueces, Almendras, Pasas)",
    price: 980,
    image: "https://images.unsplash.com/photo-1567892737950-30c7c8e1c863?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Mix",
    stock: 30,
    presentation: "100g"
  },
  {
    id: "8",
    name: "Nueces de Macadamia Premium",
    price: 1800,
    image: "https://images.unsplash.com/photo-1579035891970-1e2cb82d6a39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Nueces",
    stock: 15,
    discount: 5,
    presentation: "150g"
  }
];

export const featuredProducts = products.slice(0, 4);
export const newProducts = [products[5], products[6], products[7], products[1]];

export const getProductById = (id: number | string): Product | undefined => {
  const idString = String(id);
  return products.find(product => String(product.id) === idString);
};

export const getRelatedProducts = (id: number | string, category: string): Product[] => {
  const idString = String(id);
  return products
    .filter(product => String(product.id) !== idString && product.category === category)
    .slice(0, 4);
};
