
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, User, Watch, Plus, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import SearchDialog from "@/components/SearchDialog";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = localStorage.getItem('cart') 
        ? JSON.parse(localStorage.getItem('cart') || '[]') 
        : [];
      
      const count = cartItems.reduce(
        (sum: number, item: { quantity: number }) => sum + item.quantity, 
        0
      );
      
      setCartItemsCount(count);
    };
    
    updateCartCount();
    
    window.addEventListener('storage', updateCartCount);
    
    const handleCartUpdate = () => {
      updateCartCount();
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [location.pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Watches", path: "/products" },
    { name: "About", path: "/about" },
  ];

  // Mobile menu links with additional admin features
  const mobileMenuLinks = [
    ...navLinks,
    { name: "Add Product", path: "/add-product", icon: <Plus className="h-4 w-4 mr-2" /> },
    { name: "Order History", path: "/orders", icon: <ListOrdered className="h-4 w-4 mr-2" /> },
  ];

  // Helper function to safely render icons
  const renderIcon = (link: any) => {
    return 'icon' in link ? link.icon : null;
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md px-6 sm:px-10 py-4",
      isScrolled ? "bg-white/80 shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="relative z-10 flex items-center">
          <Watch className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-heading font-semibold tracking-tight">
            Chrono
          </h1>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-black/80",
                location.pathname === link.path ? "text-black" : "text-black/60"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Search"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>
          {user ? (
            <Link to="/profile">
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="ghost">
                Login
              </Button>
            </Link>
          )}
          {user ? (
            <div className="flex space-x-2">
              <Link to="/orders">
                <Button variant="ghost" size="sm" className="flex items-center">
                  <ListOrdered className="h-4 w-4 mr-2" />
                  <span>Orders</span>
                </Button>
              </Link>
              <Link to="/add-product">
                <Button variant="default" className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  <span>Add Product</span>
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/register">
              <Button variant="default" className="ml-2">
                Register
              </Button>
            </Link>
          )}
        </div>

        <button
          className="md:hidden relative z-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-black" />
          ) : (
            <Menu className="h-6 w-6 text-black" />
          )}
        </button>

        <div className="md:hidden flex items-center space-x-2 relative z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Search" 
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile menu overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-0 pt-20">
            <div className="container px-6 py-8">
              <nav className="flex flex-col space-y-4">
                {mobileMenuLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "flex items-center py-2 text-lg font-medium border-b border-gray-100",
                      location.pathname === link.path ? "text-primary" : "text-gray-800"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {renderIcon(link)}
                    {link.name}
                  </Link>
                ))}
                
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center py-2 text-lg font-medium border-b border-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      My Profile
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center py-2 text-lg font-medium border-b border-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center py-2 text-lg font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </div>
        )}

        <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      </div>
    </header>
  );
};

export default Navbar;
