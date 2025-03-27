
import { useState, useEffect } from "react";
import { supabase, ProductTable } from "@/lib/supabase";
import { toast } from "sonner";
import { Product } from "@/components/ProductCard";

export const useProducts = (categoryFilter?: string, searchQuery?: string) => {
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
        
        // Execute the query
        const { data, error } = await query;
        
        if (error) throw error;
        
        // Transform Supabase data to match our Product type
        const formattedProducts = data.map((item: ProductTable) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category,
          image: item.image,
          description: item.description,
        }));
        
        // Apply search filter in memory (if needed)
        let filteredProducts = formattedProducts;
        if (searchQuery && searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filteredProducts = formattedProducts.filter(
            product => 
              product.name.toLowerCase().includes(query) || 
              product.description.toLowerCase().includes(query)
          );
        }
        
        setProducts(filteredProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch products"));
        // Fallback to sample data if in development
        if (import.meta.env.DEV) {
          import('@/data/products').then(module => {
            setProducts(module.SAMPLE_PRODUCTS);
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
