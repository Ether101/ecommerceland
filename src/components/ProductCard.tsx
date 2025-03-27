
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-lg transition-all duration-300 bg-white hover:shadow-md",
        className
      )}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <div className="mb-1 text-xs text-gray-500">{product.category}</div>
          <h3 className="font-medium text-base mb-1">{product.name}</h3>
          <div className="font-medium">${product.price.toFixed(2)}</div>
        </div>
      </Link>
      <div className="absolute bottom-0 left-0 right-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 p-4 bg-gradient-to-t from-white via-white">
        <Button className="w-full">Add to Cart</Button>
      </div>
    </div>
  );
};

export default ProductCard;
