
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  className?: string;
}

const ProductCard = ({ 
  product, 
  isFavorite = false, 
  onToggleFavorite, 
  className 
}: ProductCardProps) => {
  
  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get current cart from localStorage
    const cartItems = localStorage.getItem('cart') 
      ? JSON.parse(localStorage.getItem('cart') || '[]') 
      : [];
    
    // Check if product is already in cart
    const existingItemIndex = cartItems.findIndex(
      (item: { product: Product; quantity: number }) => item.product.id === product.id
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity if product is already in cart
      cartItems[existingItemIndex].quantity += 1;
      toast.success(`Increased ${product.name} quantity in cart`);
    } else {
      // Add new product to cart
      cartItems.push({
        product,
        quantity: 1
      });
      toast.success(`Added ${product.name} to cart`);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };
  
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-lg transition-all duration-300 bg-white hover:shadow-md",
        className
      )}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <div className="mb-1 text-xs text-gray-500">{product.category}</div>
          <h3 className="font-medium text-base mb-1">{product.name}</h3>
          <div className="font-medium">${product.price.toFixed(2)}</div>
        </div>
      </Link>
      
      {onToggleFavorite && (
        <button 
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite();
          }}
          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow-sm z-10 transition-all hover:bg-white"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            className={cn(
              "h-5 w-5 transition-colors", 
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            )} 
          />
        </button>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 p-4 bg-gradient-to-t from-white via-white">
        <Button 
          className="w-full"
          onClick={addToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
