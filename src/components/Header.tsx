
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import CartDrawer from "./CartDrawer";

const Header = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

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
              <Link to="/nosotros" className="text-nut-700 hover:text-nut-900 transition-colors">
                Nosotros
              </Link>
              <Link to="/contacto" className="text-nut-700 hover:text-nut-900 transition-colors">
                Contacto
              </Link>
            </nav>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search - Desktop */}
            <div className="hidden md:flex items-center relative">
              <Input 
                placeholder="Buscar productos..." 
                className="w-64 bg-nut-50 border-nut-200 focus:border-nut-400" 
              />
              <Search className="absolute right-3 h-4 w-4 text-nut-400" />
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
                    <Input 
                      placeholder="Buscar productos..." 
                      className="w-full bg-nut-50 border-nut-200" 
                      autoFocus
                    />
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
              <span className="absolute -top-1 -right-1 bg-nut-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
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
              <Link
                to="/nosotros"
                onClick={toggleMenu}
                className="text-nut-700 hover:text-nut-900 transition-colors py-2"
              >
                Nosotros
              </Link>
              <Link
                to="/contacto"
                onClick={toggleMenu}
                className="text-nut-700 hover:text-nut-900 transition-colors py-2"
              >
                Contacto
              </Link>
            </div>
          </nav>
        )}
      </div>
      
      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={toggleCart} />
    </header>
  );
};

export default Header;
