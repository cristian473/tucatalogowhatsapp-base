import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import CartDrawer from "./CartDrawer";
import { searchProducts } from "@/services/searchService";
import { Product } from "./ProductCard";
import ProductSearchResults from "./ProductSearchResults";
import { useDebounce } from "@/hooks/use-debounce";
import { useCart } from "@/contexts/CartContext";
import WhatsAppButton from "./WhatsAppButton";

const Header = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { itemCount } = useCart();
  
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
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  
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
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-playfair font-bold text-nut-800">NuezMarket</h1>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-nut-700 hover:text-nut-900 transition-colors">
                Inicio
              </Link>
              <Link to="/productos" className="text-nut-700 hover:text-nut-900 transition-colors">
                Productos
              </Link>
            </nav>
          )}

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
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="text-nut-700 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-nut-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>

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
                to="/"
                onClick={toggleMenu}
                className="text-nut-700 hover:text-nut-900 transition-colors py-2"
              >
                Inicio
              </Link>
              <Link
                to="/productos"
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
      <CartDrawer isOpen={isCartOpen} onClose={toggleCart} />

      {/* WhatsApp Button */}
      <WhatsAppButton 
        phoneNumber="5491159080306" 
        message="Hola! Me gustaría obtener más información sobre los productos de NuezMarket." 
      />
    </header>
  );
};

export default Header;
