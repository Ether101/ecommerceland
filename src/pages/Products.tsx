
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SAMPLE_PRODUCTS, CATEGORIES } from "@/data/products";
import { Search } from "lucide-react";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get category from URL params
  const categoryParam = searchParams.get("category");
  
  useEffect(() => {
    // In a real app, you'd fetch from an API
    setProducts(SAMPLE_PRODUCTS);
  }, []);
  
  useEffect(() => {
    let result = [...products];
    
    // Filter by category if specified
    if (categoryParam) {
      result = result.filter(product => 
        product.category.toLowerCase() === categoryParam.toLowerCase()
      );
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
  }, [products, categoryParam, searchQuery]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering happens in the useEffect
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
            <h1 className="text-4xl font-heading font-medium mb-6">
              {categoryParam 
                ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}` 
                : "All Products"}
            </h1>
            
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
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>
          
          {filteredProducts.length > 0 ? (
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
              <h3 className="text-2xl font-medium mb-4">No products found</h3>
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
