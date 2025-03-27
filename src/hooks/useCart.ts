
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Product } from "@/components/ProductCard";

export interface CartItem {
  product: Product;
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  // Load cart items
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      
      try {
        if (user) {
          // If user is logged in, fetch cart from Supabase
          const { data, error } = await supabase
            .from("cart_items")
            .select(`
              id,
              quantity,
              products (
                id,
                name,
                price,
                category,
                image,
                description
              )
            `)
            .eq("user_id", user.id);
            
          if (error) throw error;
          
          // Transform data to match CartItem format
          const formattedItems = data.map((item: any) => ({
            product: item.products,
            quantity: item.quantity
          }));
          
          setCartItems(formattedItems);
        } else {
          // If not logged in, use localStorage
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
            setCartItems(JSON.parse(savedCart));
          }
        }
      } catch (err) {
        console.error("Error loading cart:", err);
        // Fallback to localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
        toast.error("Failed to load cart from database");
      } finally {
        setLoading(false);
      }
    };
    
    loadCart();
  }, [user]);
  
  // Add item to cart
  const addToCart = async (product: Product, quantity: number = 1) => {
    try {
      const existingItemIndex = cartItems.findIndex(
        item => item.product.id === product.id
      );
      
      let updatedCart: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update quantity if product already exists in cart
        updatedCart = [...cartItems];
        updatedCart[existingItemIndex].quantity += quantity;
        toast.success(`Increased ${product.name} quantity in cart`);
      } else {
        // Add new product to cart
        updatedCart = [...cartItems, { product, quantity }];
        toast.success(`Added ${product.name} to cart`);
      }
      
      // Update state
      setCartItems(updatedCart);
      
      if (user) {
        // If user is logged in, update Supabase
        if (existingItemIndex >= 0) {
          // Update existing cart item
          const { error } = await supabase
            .from("cart_items")
            .update({ 
              quantity: updatedCart[existingItemIndex].quantity 
            })
            .eq("user_id", user.id)
            .eq("product_id", product.id);
            
          if (error) throw error;
        } else {
          // Insert new cart item
          const { error } = await supabase
            .from("cart_items")
            .insert({
              user_id: user.id,
              product_id: product.id,
              quantity
            });
            
          if (error) throw error;
        }
      } else {
        // If not logged in, use localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
      
      // Dispatch custom event for components listening to cart updates
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to update cart");
    }
  };
  
  // Update item quantity
  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      const updatedCart = cartItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      );
      
      // Update state
      setCartItems(updatedCart);
      
      if (user) {
        // If user is logged in, update Supabase
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: newQuantity })
          .eq("user_id", user.id)
          .eq("product_id", productId);
          
        if (error) throw error;
      } else {
        // If not logged in, use localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
      
      // Dispatch custom event for components listening to cart updates
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (err) {
      console.error("Error updating cart:", err);
      toast.error("Failed to update cart quantity");
    }
  };
  
  // Remove item from cart
  const removeItem = async (productId: string) => {
    try {
      const updatedCart = cartItems.filter(item => item.product.id !== productId);
      
      // Update state
      setCartItems(updatedCart);
      
      if (user) {
        // If user is logged in, delete from Supabase
        const { error } = await supabase
          .from("cart_items")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);
          
        if (error) throw error;
      } else {
        // If not logged in, use localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
      
      toast.info("Item removed from cart");
      
      // Dispatch custom event for components listening to cart updates
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (err) {
      console.error("Error removing from cart:", err);
      toast.error("Failed to remove item from cart");
    }
  };
  
  // Clear the entire cart
  const clearCart = async () => {
    try {
      // Update state
      setCartItems([]);
      
      if (user) {
        // If user is logged in, delete all items from Supabase
        const { error } = await supabase
          .from("cart_items")
          .delete()
          .eq("user_id", user.id);
          
        if (error) throw error;
      } else {
        // If not logged in, clear localStorage
        localStorage.removeItem('cart');
      }
      
      // Dispatch custom event for components listening to cart updates
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (err) {
      console.error("Error clearing cart:", err);
      toast.error("Failed to clear cart");
    }
  };
  
  // Calculate cart total
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };
  
  return { 
    cartItems, 
    loading, 
    addToCart, 
    updateQuantity, 
    removeItem, 
    clearCart,
    calculateTotal
  };
};
