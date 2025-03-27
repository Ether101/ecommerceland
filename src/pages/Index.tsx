
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
          title="Refined Essentials for Modern Living"
          subtitle="Curated products that combine beauty and function with minimalist design principles."
          image="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1000"
        />
        
        <div className="py-12 px-6 sm:px-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-medium mb-6">Our Philosophy</h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We believe in the power of simplicity. Every product in our collection is crafted with intention, 
              focusing on essential functionality while eliminating the unnecessary. 
              Our commitment to quality materials and thoughtful design ensures that each piece becomes a 
              lasting part of your life.
            </p>
          </div>
        </div>
        
        <FeaturedProducts />
        
        <CategorySection categories={CATEGORIES} />
        
        <div className="relative py-24 px-6 sm:px-10 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?q=80&w=1000" 
              alt="Background"
              className="h-full w-full object-cover opacity-20"
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-medium mb-8">Designed with Purpose</h2>
            <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
              Every item is thoughtfully created to blend form and function seamlessly, 
              bringing beauty and utility to your everyday life.
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
