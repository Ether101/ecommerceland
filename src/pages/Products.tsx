
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/data/products";
import { Search, Watch } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get category from URL params
  const categoryParam = searchParams.get("category");
  
  // Use the useProducts hook to fetch and filter products
  const { products: filteredProducts, loading } = useProducts(categoryParam, searchQuery);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering happens in the useProducts hook
  };
  
  const handleCategoryClick = (category: string) => {
    setSearchParams({ category });
  };
  
  const clearFilters = () => {
    setSearchParams({});
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-start mb-12">
            <div className="flex items-center mb-6">
              <Watch className="h-8 w-8 mr-3" />
              <h1 className="text-4xl font-heading font-medium">
                {categoryParam 
                  ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Watches` 
                  : "All Watches"}
              </h1>
            </div>
            
            <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={!categoryParam ? "default" : "outline"} 
                  onClick={clearFilters}
                >
                  All
                </Button>
                {CATEGORIES.map(category => (
                  <Button
                    key={category.id}
                    variant={categoryParam === category.slug ? "default" : "outline"}
                    onClick={() => handleCategoryClick(category.slug)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
              
              <form onSubmit={handleSearch} className="w-full md:w-auto flex-1 md:max-w-xs">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search watches..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>
          
          {loading ? (
            <div className="py-20 text-center">
              <h3 className="text-xl font-medium mb-4">Loading watches...</h3>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
              {filteredProducts.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  className={`animate-slide-up [animation-delay:${index * 50}ms]`} 
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <h3 className="text-2xl font-medium mb-4">No watches found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your search or filter criteria</p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
