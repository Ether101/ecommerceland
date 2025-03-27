
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, User, Watch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const location = useLocation();

  // Track scrolling for navbar style change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update cart count when cart changes
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
    
    // Initial count
    updateCartCount();
    
    // Listen for storage events (when cart is updated)
    window.addEventListener('storage', updateCartCount);
    
    // Custom event for when we update the cart from this tab
    const handleCartUpdate = () => {
      updateCartCount();
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    // Update cart count when location changes
    updateCartCount();
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [location.pathname]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Watches", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md px-6 sm:px-10 py-4",
      isScrolled ? "bg-white/80 shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="relative z-10 flex items-center">
          <Watch className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-heading font-semibold tracking-tight">
            Chrono
          </h1>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Navigation Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" aria-label="Search">
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
          <Link to="/account">
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/orders">
            <Button variant="default" className="ml-2">
              My Orders
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
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

        {/* Mobile Cart Icon */}
        <Link to="/cart" className="md:hidden relative z-10">
          <Button variant="ghost" size="icon" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Button>
        </Link>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-0 md:hidden">
            <div className="flex flex-col items-center justify-center h-full">
              <nav className="flex flex-col items-center space-y-8 mb-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-black",
                      location.pathname === link.path ? "text-black" : "text-black/60"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link 
                  to="/cart"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-black",
                    location.pathname === "/cart" ? "text-black" : "text-black/60"
                  )}
                >
                  Cart
                </Link>
              </nav>
              <div className="flex flex-col space-y-4 items-center">
                <Link to="/orders">
                  <Button variant="default" className="w-40">
                    My Orders
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
