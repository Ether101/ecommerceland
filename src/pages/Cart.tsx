import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, Minus, Trash2, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/components/ProductCard";

interface CartItem {
  product: Product;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "credit-card">("paypal");
  const [checkoutStage, setCheckoutStage] = useState<"cart" | "shipping" | "payment" | "confirmation">("cart");

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
    setIsCheckingOut(true);
    setCheckoutStage("shipping");
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStage("payment");
    
    // Simulate payment processing
    setTimeout(() => {
      if (paymentMethod === "paypal") {
        simulatePayPalRedirect();
      } else {
        processCreditCardPayment();
      }
    }, 1000);
  };
  
  const simulatePayPalRedirect = () => {
    toast.info("Redirecting to PayPal...");
    
    // Simulate PayPal sandbox experience
    setTimeout(() => {
      // Simulate successful return from PayPal
      completeOrder();
    }, 3000);
  };
  
  const processCreditCardPayment = () => {
    toast.info("Processing credit card payment...");
    
    // Simulate payment processing
    setTimeout(() => {
      completeOrder();
    }, 2000);
  };
  
  const completeOrder = () => {
    setCheckoutStage("confirmation");
    
    // Clear cart after successful purchase
    localStorage.removeItem('cart');
    setCartItems([]);
    
    toast.success("Payment successful! Your order has been placed.");
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
  
  if (checkoutStage === "confirmation") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 px-6 sm:px-10">
          <div className="max-w-3xl mx-auto text-center py-20">
            <div className="mb-6 text-green-500">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-lg mb-8">Thank you for your purchase. Your order has been successfully placed.</p>
            <p className="text-md mb-2">Order #: CHR-{Math.floor(Math.random() * 10000)}</p>
            <p className="text-md mb-8">A confirmation email has been sent to your email address.</p>
            <Link to="/products">
              <Button>Continue Shopping</Button>
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
          {!isCheckingOut && (
            <div className="mb-8 animate-fade-in">
              <Link to="/products" className="inline-flex items-center text-sm hover:underline">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Continue Shopping
              </Link>
            </div>
          )}
          
          <h1 className="text-3xl font-heading font-medium mb-8">
            {checkoutStage === "cart" ? "Your Cart" : 
             checkoutStage === "shipping" ? "Shipping Information" :
             "Payment"}
          </h1>
          
          {cartItems.length === 0 && checkoutStage === "cart" ? (
            <div className="py-20 text-center">
              <h3 className="text-2xl font-medium mb-4">Your cart is empty</h3>
              <p className="text-gray-600 mb-8">Add some watches to your cart to see them here</p>
              <Link to="/products">
                <Button>Browse Watches</Button>
              </Link>
            </div>
          ) : (
            <>
              {checkoutStage === "cart" && (
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

              {checkoutStage === "shipping" && (
                <div className="max-w-2xl mx-auto">
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
                        <input 
                          type="text" 
                          id="firstName" 
                          required
                          className="w-full px-3 py-2 border rounded-md" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
                        <input 
                          type="text" 
                          id="lastName" 
                          required
                          className="w-full px-3 py-2 border rounded-md" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        className="w-full px-3 py-2 border rounded-md" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="address" className="block text-sm font-medium">Street Address</label>
                      <input 
                        type="text" 
                        id="address" 
                        required
                        className="w-full px-3 py-2 border rounded-md" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="city" className="block text-sm font-medium">City</label>
                        <input 
                          type="text" 
                          id="city" 
                          required
                          className="w-full px-3 py-2 border rounded-md" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="state" className="block text-sm font-medium">State</label>
                        <input 
                          type="text" 
                          id="state" 
                          required
                          className="w-full px-3 py-2 border rounded-md" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="zipCode" className="block text-sm font-medium">Zip Code</label>
                        <input 
                          type="text" 
                          id="zipCode" 
                          required
                          className="w-full px-3 py-2 border rounded-md" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="country" className="block text-sm font-medium">Country</label>
                      <select id="country" className="w-full px-3 py-2 border rounded-md">
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="paypal" 
                            name="paymentMethod" 
                            checked={paymentMethod === "paypal"}
                            onChange={() => setPaymentMethod("paypal")}
                            className="h-4 w-4 mr-2" 
                          />
                          <label htmlFor="paypal" className="flex items-center">
                            <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
                                 alt="PayPal" 
                                 className="h-6 mr-2" />
                            PayPal
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="credit-card" 
                            name="paymentMethod" 
                            checked={paymentMethod === "credit-card"}
                            onChange={() => setPaymentMethod("credit-card")}
                            className="h-4 w-4 mr-2" 
                          />
                          <label htmlFor="credit-card" className="flex items-center">
                            <CreditCard className="h-5 w-5 mr-2" />
                            Credit Card
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 flex flex-col sm:flex-row justify-between gap-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setCheckoutStage("cart")}
                      >
                        Back to Cart
                      </Button>
                      <Button type="submit">
                        {paymentMethod === "paypal" ? "Continue to PayPal" : "Continue to Payment"}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              
              {checkoutStage === "payment" && (
                <div className="max-w-2xl mx-auto">
                  <div className="text-center p-8">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="mb-4">
                        {paymentMethod === "paypal" ? (
                          <img 
                            src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
                            alt="PayPal" 
                            className="h-16" 
                          />
                        ) : (
                          <CreditCard className="h-16 w-16" />
                        )}
                      </div>
                      <h2 className="text-xl font-medium mb-2">
                        {paymentMethod === "paypal" ? "Connecting to PayPal..." : "Processing payment..."}
                      </h2>
                      <p className="text-gray-500">Please do not close this window</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
