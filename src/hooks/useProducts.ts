
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Product } from "@/components/ProductCard";

export const useProducts = (categoryFilter?: string | null, searchQuery?: string | null) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      try {
        let query = supabase.from("products").select("*");
        
        // Apply category filter if provided
        if (categoryFilter) {
          query = query.eq("category", categoryFilter);
        }
        
        // Apply server-side search if provided
        if (searchQuery && searchQuery.trim()) {
          const searchTerm = searchQuery.toLowerCase().trim();
          query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
        }
        
        // Execute the query
        const { data, error } = await query;
        
        if (error) throw error;
        
        // Transform Supabase data to match our Product type
        const formattedProducts = data.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category,
          image: item.image,
          description: item.description,
        }));
        
        setProducts(formattedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch products"));
        // Fallback to sample data if in development
        if (import.meta.env.DEV) {
          import('@/data/products').then(module => {
            let result = [...module.SAMPLE_PRODUCTS];
            
            // Apply category filter
            if (categoryFilter) {
              result = result.filter(product => 
                product.category.toLowerCase() === categoryFilter.toLowerCase()
              );
            }
            
            // Apply search filter
            if (searchQuery && searchQuery.trim()) {
              const query = searchQuery.toLowerCase();
              result = result.filter(
                product => 
                  product.name.toLowerCase().includes(query) || 
                  product.description.toLowerCase().includes(query)
              );
            }
            
            setProducts(result);
            toast.error("Using sample data - Supabase fetch failed");
          });
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [categoryFilter, searchQuery]);
  
  return { products, loading, error };
};
