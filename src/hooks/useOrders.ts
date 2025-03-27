
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
        // Fetch orders from Supabase
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        
        if (ordersError) throw ordersError;
        
        // Fetch order items for each order
        const ordersWithItems = await Promise.all(
          ordersData.map(async (order) => {
            const { data: orderItems, error: itemsError } = await supabase
              .from("order_items")
              .select(`
                id,
                quantity,
                price,
                product_id,
                products (
                  id,
                  name
                )
              `)
              .eq("order_id", order.id);
            
            if (itemsError) throw itemsError;
            
            // Format order items with safer type checking
            const items = orderItems.map((item) => {
              // Safely extract product name from the nested products object
              let productName = "Unknown Product";
              if (item.products) {
                if (typeof item.products === 'object' && item.products !== null) {
                  // Check if the object has a name property
                  productName = (item.products as any).name || "Unknown Product";
                }
              }
              
              return {
                product_id: item.product_id,
                name: productName,
                price: item.price,
                quantity: item.quantity
              };
            });
            
            return {
              id: order.id,
              date: order.created_at,
              status: order.status,
              total: order.total,
              items
            };
          })
        );
        
        setOrders(ordersWithItems);
      } catch (err) {
        console.error("Error fetching orders:", err);
        toast.error("Failed to load orders");
        
        // Fallback to sample data in development
        if (import.meta.env.DEV) {
          import('@/data/products').then(module => {
            // Convert sample data to match our Order interface
            const formattedOrders = module.ORDERS.map((order: any) => ({
              ...order,
              items: order.items.map((item: any) => ({
                product_id: item.id || item.product_id || "", // Handle both formats
                name: item.name || "Unknown Item",
                price: item.price || 0,
                quantity: item.quantity || 1
              }))
            }));
            setOrders(formattedOrders);
            toast.error("Using sample data - Supabase fetch failed");
          });
        }
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
      
      // Insert order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          status: "pending",
          total,
          shipping_details: shippingDetails,
          payment_method: paymentMethod
        })
        .select()
        .single();
      
      if (orderError) throw orderError;
      
      // Insert order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }));
      
      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);
      
      if (itemsError) throw itemsError;
      
      // Clear the cart after successful order
      await clearCart();
      
      return order;
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
