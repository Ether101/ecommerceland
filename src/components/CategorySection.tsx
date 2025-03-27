
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}

interface CategorySectionProps {
  categories: Category[];
  className?: string;
}

const CategorySection = ({ categories, className }: CategorySectionProps) => {
  return (
    <section className={cn("py-20 px-6 sm:px-10", className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-heading font-medium mb-12 text-center">Browse Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link 
              key={category.id} 
              to={`/products?category=${category.slug}`}
              className={`group relative overflow-hidden rounded-lg aspect-[3/4] animate-slide-up [animation-delay:${index * 100}ms]`}
            >
              <img 
                src={category.image} 
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <h3 className="text-xl text-white font-medium">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
