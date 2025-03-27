
import { useState, useEffect } from "react";
import ProductCard, { Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SAMPLE_PRODUCTS } from "@/data/products";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // In a real app, you'd fetch from an API
    // For now, we'll use our sample data
    setProducts(SAMPLE_PRODUCTS.slice(0, 4));
  }, []);

  return (
    <section className="py-20 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-heading font-medium">Featured Products</h2>
          <Link to="/products">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              className={`animate-slide-up [animation-delay:${index * 100}ms]`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
