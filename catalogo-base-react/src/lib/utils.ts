
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Product } from "@/components/ProductCard"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date to a string in the format DD-MM-YYYY
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Filter products by search term
 */
export function filterProductsBySearch(products: Product[], searchTerm: string): Product[] {
  if (!searchTerm.trim()) return [];
  
  const lowercaseSearch = searchTerm.toLowerCase().trim();
  
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseSearch) ||
    product.category.toLowerCase().includes(lowercaseSearch)
  ).slice(0, 5); // Limit to 5 results
}
