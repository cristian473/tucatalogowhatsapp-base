
'use client'

import { useState, useEffect } from "react";
import Link from 'next/link'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import CartDrawer from "./CartDrawer";
import CartButton from "./CartButton";
import ProductSearchResults from "./ProductSearchResults";
import { useDebounce } from "@/hooks/use-debounce";
import WhatsAppButton from "./WhatsAppButton";
import { searchProducts } from "@/lib/services/products";

const Header = ({ catalog }: { catalog: Catalog }) => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchTerm.length < 2) {
        setSearchResults([]);
        return;
      }
      
      setIsSearching(true);
      const results = await searchProducts(debouncedSearchTerm);
      setSearchResults(results);
      setIsSearching(false);
      setShowResults(true);
    };

    performSearch();
  }, [debouncedSearchTerm]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 0) {
      setShowResults(true);
    }
  };

  const handleSearchFocus = () => {
    setShowResults(true);
  };

  const handleSearchBlur = () => {
    // Delay hiding results to allow for clicking on them
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowResults(false);
  };

  return (
    <header className="border-b border-nut-100 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation grouped together */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img 
                src={catalog.logo_url ?? '/default-logo.png'}
                alt={`${catalog.name} Logo`} 
                className="h-14 w-auto" 
              />
            </Link>

            {/* Desktop Navigation moved next to logo */}
            <nav className={`${isMobile ? 'hidden' : 'flex'} items-center space-x-8`}>
              <Link href="/" className="text-nut-700 hover:text-nut-900 transition-colors">
                Inicio
              </Link>
              <Link href="/productos" className="text-nut-700 hover:text-nut-900 transition-colors">
                Productos
              </Link>
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search - Desktop */}
            <div className="hidden md:flex items-center relative">
              <div className="relative w-64">
                <Input 
                  placeholder="Buscar productos..." 
                  className="w-full bg-nut-50 border-nut-200 focus:border-nut-400 pr-8"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                />
                {searchTerm ? (
                  <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-nut-400 hover:text-nut-600"
                    onClick={clearSearch}
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-nut-400" />
                )}
              </div>
              
              {showResults && (
                <div className="absolute top-full left-0 right-0 mt-1 z-50">
                  <ProductSearchResults 
                    results={searchResults} 
                    isLoading={isSearching} 
                    onSelect={clearSearch}
                    searchTerm={searchTerm}
                  />
                </div>
              )}
            </div>
            
            {/* Search - Mobile */}
            {isMobile && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="text-nut-700"
                >
                  <Search className="h-5 w-5" />
                </Button>
                {searchOpen && (
                  <div className="absolute top-16 left-0 right-0 p-4 bg-white border-b border-nut-100 z-50 animate-fade-in">
                    <div className="relative">
                      <Input 
                        placeholder="Buscar productos..." 
                        className="w-full bg-nut-50 border-nut-200"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onFocus={handleSearchFocus}
                        autoFocus
                      />
                      {searchTerm ? (
                        <button 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-nut-400 hover:text-nut-600"
                          onClick={clearSearch}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      ) : (
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-nut-400" />
                      )}
                    </div>
                    
                    {showResults && (
                      <div className="mt-2">
                        <ProductSearchResults 
                          results={searchResults} 
                          isLoading={isSearching} 
                          onSelect={clearSearch}
                          searchTerm={searchTerm}
                        />
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Cart Button */}
            <CartButton />

            {/* Mobile Menu Button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="md:hidden text-nut-700"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && isMobile && (
          <nav className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={toggleMenu}
                className="text-nut-700 hover:text-nut-900 transition-colors py-2"
              >
                Inicio
              </Link>
              <Link
                href="/productos"
                onClick={toggleMenu}
                className="text-nut-700 hover:text-nut-900 transition-colors py-2"
              >
                Productos
              </Link>
            </div>
          </nav>
        )}
      </div>
      
      {/* Cart Drawer */}
      <CartDrawer catalogData={catalog} />

      {/* WhatsAppButton */}
      <WhatsAppButton 
        phoneNumber="11 3341-4526" 
        message="Hola! Me gustaría obtener más información sobre los productos de Maná frutos-secos." 
        isHidden={false}
      />
    </header>
  );
};

export default Header;
