
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  image: string;
  className?: string;
}

const HeroSection = ({ title, subtitle, image, className }: HeroSectionProps) => {
  return (
    <div className={cn("relative min-h-[85vh] flex items-center", className)}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt="Hero background" 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 animate-slide-up">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-slide-up [animation-delay:100ms]">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up [animation-delay:200ms]">
            <Link to="/products">
              <Button size="lg" className="bg-white text-black hover:bg-white/90">
                Shop Now
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
