
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { products } from "@/data/products";
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

const categories = Array.from(new Set(products.map(p => p.category)));
const maxPrice = Math.max(...products.map(p => p.price));

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [priceRange, setPriceRange] = useState<number[]>([0, maxPrice]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStock, setInStock] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Initialize filters from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const stockParam = searchParams.get('inStock');
    
    if (categoryParam) {
      setSelectedCategories(categoryParam.split(','));
    }
    
    if (searchParam) {
      setSearchTerm(searchParam);
    }
    
    if (minPriceParam && maxPriceParam) {
      setPriceRange([parseInt(minPriceParam), parseInt(maxPriceParam)]);
    }
    
    if (stockParam === 'true') {
      setInStock(true);
    }
  }, []);
  
  // Apply filters
  useEffect(() => {
    let filtered = [...products];
    
    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    
    // Price range filter
    filtered = filtered.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    // Stock filter
    if (inStock) {
      filtered = filtered.filter(p => p.stock > 0);
    }
    
    setFilteredProducts(filtered);
    
    // Update URL params
    const newParams = new URLSearchParams();
    
    if (selectedCategories.length > 0) {
      newParams.set('category', selectedCategories.join(','));
    }
    
    if (searchTerm) {
      newParams.set('search', searchTerm);
    }
    
    newParams.set('minPrice', priceRange[0].toString());
    newParams.set('maxPrice', priceRange[1].toString());
    
    if (inStock) {
      newParams.set('inStock', 'true');
    }
    
    setSearchParams(newParams);
  }, [searchTerm, selectedCategories, priceRange, inStock]);
  
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setPriceRange([0, maxPrice]);
    setInStock(false);
    setSearchParams({});
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Page Title */}
          <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-8">
            Nuestros Productos
          </h1>
          
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
            
            {/* Filter Toggle Button (Mobile) */}
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
            
            {/* Sort Dropdown */}
            <div className="lg:col-span-1">
              <select 
                className="w-full h-10 px-3 border border-nut-200 rounded-md focus:outline-none focus:ring-1 focus:ring-nut-300"
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
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
              <div className="bg-white rounded-lg border border-nut-100 p-6 sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Filtros</h3>
                
                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Categorías</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Precio</h4>
                  <Slider 
                    defaultValue={[0, maxPrice]} 
                    max={maxPrice} 
                    step={1} 
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-nut-600">${priceRange[0]}</span>
                    <span className="text-sm text-nut-600">${priceRange[1]}</span>
                  </div>
                </div>
                
                {/* Stock Filter */}
                <div>
                  <div className="flex items-center">
                    <Checkbox
                      id="stock-filter"
                      checked={inStock}
                      onCheckedChange={() => setInStock(!inStock)}
                    />
                    <label
                      htmlFor="stock-filter"
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Solo productos en stock
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-nut-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                      <path d="M4.24 20h15.52a.78.78 0 0 0 .77-.91l-1.64-10.53A.8.8 0 0 0 18.1 8H5.9a.8.8 0 0 0-.78.56L3.47 19.09a.78.78 0 0 0 .77.91Z"></path>
                      <path d="M8 12h8"></path>
                      <path d="M9 4h6"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">No se encontraron productos</h3>
                  <p className="text-nut-600 mb-4">Prueba con otros filtros o términos de búsqueda.</p>
                  <Button onClick={clearFilters} className="bg-nut-700 hover:bg-nut-800">
                    Ver todos los productos
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-4 text-sm text-nut-600">
                    Mostrando {filteredProducts.length} de {products.length} productos
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
