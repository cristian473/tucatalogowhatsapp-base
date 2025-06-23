"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

export function ProductFiltersTop() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Estado local para UI
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  // Debounce para la búsqueda
  const [sortOption, setSortOption] = useState(searchParams.get("sort") || "default");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  // Actualizar URL cuando cambien los filtros
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (sortOption) params.set("sort", sortOption);
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  }, [debouncedSearch, router, sortOption]);
  
  
  
  const clearFilters = () => {
    setSearchTerm("");
    setSortOption("default");
    router.push(window.location.pathname, { scroll: false });
  };
  
  return (
    <>
      {/* Search and Filter Controls */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Search */}
        <div className="lg:col-span-2 flex">
          <Input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white border-nut-200"
          />
        </div>
        
        {/* Sort Dropdown */}
        <div className="lg:col-span-1">
          <select 
            className="w-full h-10 px-3 border border-nut-200 rounded-md focus:outline-none focus:ring-1 focus:ring-nut-300"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Ordenar por</option>
            <option value="price-low">Precio: Menor a Mayor</option>
            <option value="price-high">Precio: Mayor a Menor</option>
            <option value="name">Nombre</option>
          </select>
        </div>
        
        {/* Clear Filters */}
        <div className="lg:col-span-1">
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full border-nut-300 text-nut-700 hover:bg-nut-50"
          >
            <X className="mr-2 h-4 w-4" />
            Limpiar Filtros
          </Button>
        </div>
      </div>
    </>
  );
}

interface ProductFiltersProps {
  categories: Category[];
  presentations: string[];
  maxPrice: number;
}

export const ProductFiltersLeft = ({
  categories,
  presentations,
  maxPrice,
}: ProductFiltersProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category")?.split(",") || []
  );
  const [selectedPresentations, setSelectedPresentations] = useState<string[]>(
    searchParams.get("presentation")?.split(",") || []
  );
  const [priceRange, setPriceRange] = useState<number[]>([
    Number(searchParams.get("minPrice") || 0),
    Number(searchParams.get("maxPrice") || maxPrice)
  ]);
  const [inStock, setInStock] = useState(searchParams.get("inStock") === "true");
  
  // Actualizar URL cuando cambien los filtros
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategories.length > 0) params.set("category", selectedCategories.join(","));
    if (selectedPresentations.length > 0) params.set("presentation", selectedPresentations.join(","));
    if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString());
    if (priceRange[1] < maxPrice) params.set("maxPrice", priceRange[1].toString());
    if (inStock) params.set("inStock", "true");
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  }, [selectedCategories, selectedPresentations, priceRange, inStock, router, maxPrice]);
    
  // Funciones para manejar cambios en los filtros
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const togglePresentation = (presentation: string) => {
    setSelectedPresentations(prev => 
      prev.includes(presentation) 
        ? prev.filter(p => p !== presentation) 
        : [...prev, presentation]
    );
  };

  return (
    <>
      <div className="lg:hidden">
        <Button 
          variant="outline" 
          className="w-full border-nut-300 flex items-center justify-center"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filtros
          {showFilters ? 
            <ChevronUp className="ml-2 h-4 w-4" /> : 
            <ChevronDown className="ml-2 h-4 w-4" />
          }
        </Button>
      </div>
      {/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-8"> */}
        {/* Filters - Reduced height */}
        <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <div className="bg-white rounded-lg border border-nut-100 p-4 sticky top-24">
            <h3 className="font-semibold text-lg mb-3">Filtros</h3>
            
            {/* Categories - Reduced spacing */}
            <div className="mb-4">
              <h4 className="font-medium mb-1">Categorías</h4>
              <div className="space-y-1">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Presentations filter */}
            <div className="mb-4">
              <h4 className="font-medium mb-1">Presentación</h4>
              <div className="space-y-1">
                {presentations.map((presentation) => (
                  <div key={presentation} className="flex items-center">
                    <Checkbox
                      id={`presentation-${presentation}`}
                      checked={selectedPresentations.includes(presentation)}
                      onCheckedChange={() => togglePresentation(presentation)}
                    />
                    <label
                      htmlFor={`presentation-${presentation}`}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {presentation}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range - Reduced spacing */}
            <div className="mb-4">
              <h4 className="font-medium mb-1">Precio</h4>
              <Slider 
                defaultValue={[0, maxPrice]} 
                max={maxPrice} 
                step={1} 
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-nut-600">${priceRange[0]}</span>
                <span className="text-sm text-nut-600">${priceRange[1]}</span>
              </div>
            </div>
            
            {/* In Stock Only */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="in-stock" 
                checked={inStock}
                onCheckedChange={() => setInStock(!inStock)}
              />
              <label
                htmlFor="in-stock"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Solo productos en stock
              </label>
            </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
}
