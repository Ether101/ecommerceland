
import { createClient } from "@supabase/supabase-js";

// Get Supabase URL and anon key from environment or use placeholders for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Products types
export type ProductTable = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  created_at: string;
};

// Cart types
export type CartItemTable = {
  id: string;
  user_id: string | null;
  product_id: string;
  quantity: number;
  created_at: string;
};

// Order types
export type OrderTable = {
  id: string;
  user_id: string | null;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  created_at: string;
};

export type OrderItemTable = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at: string;
};
