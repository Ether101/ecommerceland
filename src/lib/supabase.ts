
import { createClient } from "@supabase/supabase-js";

// Use the provided Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wkwpejsipgftkjcinneo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indrd3BlanNpcGdmdGtqY2lubmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwODIwNTYsImV4cCI6MjA1ODY1ODA1Nn0.egS4GlRoZ7MWs3t3f3_BSyYxcYgEzu9TeuMiZHcsjdw';

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
