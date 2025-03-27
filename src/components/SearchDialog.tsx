
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Search, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/components/ProductCard";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchProducts = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        // Search using Supabase
        const query = searchQuery.toLowerCase();
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
          .limit(8);

        if (error) throw error;

        const formattedProducts = data.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category,
          image: item.image,
          description: item.description,
        }));

        setSearchResults(formattedProducts);
      } catch (err) {
        console.error("Error searching products:", err);
        // Fallback to sample data in development
        if (import.meta.env.DEV) {
          import('@/data/products').then(module => {
            const query = searchQuery.toLowerCase();
            const filtered = module.SAMPLE_PRODUCTS.filter(
              (product: Product) => 
                product.name.toLowerCase().includes(query) || 
                product.description.toLowerCase().includes(query)
            ).slice(0, 8);
            setSearchResults(filtered);
          });
        }
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim()) {
        searchProducts();
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSelect = (productId: string) => {
    navigate(`/products/${productId}`);
    onOpenChange(false);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        
        <Command className="rounded-lg border shadow-md">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder="Search watches..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
          </div>
          <CommandList>
            {loading && (
              <div className="flex justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}
            
            {!loading && searchQuery && (
              <>
                <CommandEmpty>No products found.</CommandEmpty>
                <CommandGroup heading="Products">
                  {searchResults.map((product) => (
                    <CommandItem
                      key={product.id}
                      onSelect={() => handleSelect(product.id)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded bg-muted mr-2 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
        
        <div className="flex justify-end">
          <button
            onClick={handleSearchSubmit}
            disabled={!searchQuery.trim()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
          >
            View All Results
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
