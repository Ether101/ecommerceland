
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SAMPLE_PRODUCTS } from "@/data/products";
import { Product } from "@/components/ProductCard";
import { ChevronLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // First try to fetch from Supabase
        if (id) {
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("id", id)
            .single();
          
          if (error) {
            console.error("Supabase error:", error);
            throw error;
          }
          
          if (data) {
            setProduct({
              id: data.id,
              name: data.name,
              price: data.price,
              category: data.category,
              image: data.image,
              description: data.description,
            });
            return;
          }
        }
        
        // Fallback to sample data if Supabase fetch fails or in development
        const foundProduct = SAMPLE_PRODUCTS.find(p => p.id === id);
        setProduct(foundProduct || null);
        
      } catch (error) {
        console.error("Error fetching product:", error);
        
        // Fallback to sample data
        const foundProduct = SAMPLE_PRODUCTS.find(p => p.id === id);
        setProduct(foundProduct || null);
        
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
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
      cartItems[existingItemIndex].quantity += quantity;
      toast.success(`Increased ${product.name} quantity in cart`);
    } else {
      // Add new product to cart
      cartItems.push({
        product,
        quantity
      });
      toast.success(`Added ${quantity} ${product.name} to cart`);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };
  
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 flex items-center justify-center">
          <div className="animate-pulse text-2xl">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 px-6 sm:px-10">
          <div className="max-w-7xl mx-auto text-center py-20">
            <h1 className="text-3xl font-medium mb-6">Product Not Found</h1>
            <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <Link to="/products" className="inline-flex items-center text-sm hover:underline">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="rounded-lg overflow-hidden animate-slide-up">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            
            <div className="animate-slide-up [animation-delay:100ms]">
              <div className="text-sm text-gray-500 mb-2">{product.category}</div>
              <h1 className="text-3xl font-heading font-medium mb-4">{product.name}</h1>
              <div className="text-2xl font-medium mb-6">${product.price.toFixed(2)}</div>
              
              <div className="mb-8">
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div className="mb-8">
                <div className="text-sm font-medium mb-2">Quantity</div>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decreaseQuantity}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="w-16 text-center">{quantity}</div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={increaseQuantity}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="w-full sm:w-auto px-12"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
