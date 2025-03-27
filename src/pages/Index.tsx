
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";
import TestimonialSection from "@/components/TestimonialSection";
import NewsletterSection from "@/components/NewsletterSection";
import { CATEGORIES, TESTIMONIALS } from "@/data/products";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <HeroSection 
          title="Timeless Elegance on Your Wrist"
          subtitle="Precision engineered timepieces that combine traditional craftsmanship with modern design."
          image="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000"
        />
        
        <div className="py-12 px-6 sm:px-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-medium mb-6">Our Watchmaking Philosophy</h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We believe that a watch is more than just a timekeeping device—it's an expression of personal style 
              and a companion through life's moments. Every timepiece in our collection is crafted with meticulous 
              attention to detail, from the precision of the movement to the finishing of each component.
              Our watches are designed to be both functional and beautiful, combining innovative technology 
              with timeless aesthetics.
            </p>
          </div>
        </div>
        
        <FeaturedProducts />
        
        <CategorySection categories={CATEGORIES} />
        
        <div className="relative py-24 px-6 sm:px-10 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1495704907664-81f74a7efd7b?q=80&w=1000" 
              alt="Watch craftsmanship"
              className="h-full w-full object-cover opacity-20"
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-medium mb-8">Crafted with Precision</h2>
            <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
              From intricate mechanical movements to precisely engineered cases, 
              our watches represent the perfect harmony of art and technical excellence.
            </p>
          </div>
        </div>
        
        <TestimonialSection testimonials={TESTIMONIALS} />
        
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
