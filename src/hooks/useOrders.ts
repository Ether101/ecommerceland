
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useCart } from "./useCart";

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: {
    product_id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { clearCart } = useCart();
  
  // Load orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      
      try {
        // Since we don't have an orders table in Supabase yet, this is a mock implementation
        // that will be replaced by real database queries when the tables are created
        
        // In development mode, load sample data
        if (import.meta.env.DEV) {
          import('@/data/products').then(module => {
            // Convert sample data to match our Order interface
            const formattedOrders = module.ORDERS ? module.ORDERS.map((order: any) => ({
              ...order,
              items: order.items.map((item: any) => ({
                product_id: item.id || item.product_id || "", // Handle both formats
                name: item.name || "Unknown Item",
                price: item.price || 0,
                quantity: item.quantity || 1
              }))
            })) : [];
            setOrders(formattedOrders);
          });
        } else {
          // This would be the real implementation when Supabase tables are created
          setOrders([]);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        toast.error("Failed to load orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user]);
  
  // Create a new order
  const createOrder = async (
    shippingDetails: any,
    paymentMethod: string,
    cartItems: any[],
    total: number
  ) => {
    try {
      if (!user) {
        toast.error("You must be logged in to place an order");
        return null;
      }
      
      // In development mode, return a mock order
      if (import.meta.env.DEV) {
        await clearCart();
        
        toast.success("Order created successfully (Development Mode)");
        
        return {
          id: `order-${Date.now()}`,
          status: "pending",
          total,
          created_at: new Date().toISOString()
        };
      }
      
      // This would be the real implementation when Supabase tables are created
      toast.error("Orders functionality not yet implemented in production");
      return null;
    } catch (err) {
      console.error("Error creating order:", err);
      toast.error("Failed to create order");
      return null;
    }
  };
  
  return {
    orders,
    loading,
    createOrder
  };
};
