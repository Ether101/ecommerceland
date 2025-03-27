
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, Minus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/components/ProductCard";

interface CartItem {
  product: Product;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(prev => {
      const updated = prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      );
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeItem = (productId: string) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.product.id !== productId);
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(updated));
      toast.info("Item removed from cart");
      return updated;
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    toast.success("Checkout process initiated!");
    // In a real application, this would redirect to a checkout page or process
  };

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <Link to="/products" className="inline-flex items-center text-sm hover:underline">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Continue Shopping
            </Link>
          </div>
          
          <h1 className="text-3xl font-heading font-medium mb-8">Your Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="py-20 text-center">
              <h3 className="text-2xl font-medium mb-4">Your cart is empty</h3>
              <p className="text-gray-600 mb-8">Add some watches to your cart to see them here</p>
              <Link to="/products">
                <Button>Browse Watches</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <div className="border rounded-lg divide-y">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-24 h-24 object-cover rounded"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <Link to={`/products/${item.product.id}`} className="font-medium hover:underline">
                              {item.product.name}
                            </Link>
                            <div className="text-gray-500 text-sm">{item.product.category}</div>
                          </div>
                          <div className="text-lg font-medium mt-2 sm:mt-0">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <div className="w-10 text-center">{item.quantity}</div>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.product.id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="border rounded-lg p-6 sticky top-28">
                  <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>${calculateSubtotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="w-full"
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
