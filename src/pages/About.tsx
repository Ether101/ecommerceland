import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Watch } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto py-16">
          <div className="flex items-center justify-center mb-10">
            <Watch className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-heading font-medium">About Chrono</h1>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 p-8 rounded-lg mb-12 shadow-sm">
              <p className="text-xl md:text-2xl font-heading italic text-center">
                "Time is not just numbers on a dial, at Chrono we believe it is self expression. 
                Discover our range of luxury and modern timepieces that combines precision and 
                style to create the perfect accessory for any occasion. For those in pursuit of 
                timeless elegance or cutting-edge innovation, come to Chrono for premium 
                craftsmanship — and unbeatable deals.
              </p>
              <p className="text-xl md:text-2xl font-heading italic text-center mt-6 font-semibold">
                Time never stops. Neither do we."
              </p>
            </div>
            
            <h2 className="text-2xl font-heading font-medium mb-4">Our Story</h2>
            <p>
              Chrono was founded in 2005 by a group of watch enthusiasts who were passionate about 
              craftsmanship, design, and innovation. What started as a small boutique in a quiet 
              corner of the city has grown into a globally recognized brand with a commitment to 
              quality that never wavers.
            </p>
            
            <h2 className="text-2xl font-heading font-medium mb-4 mt-8">Our Approach</h2>
            <p>
              Every Chrono timepiece is a testament to our dedication to excellence. We work with 
              expert watchmakers who understand that even the smallest details matter. From the 
              design phase to the final quality check, every step is conducted with meticulous 
              care and attention.
            </p>
            
            <h2 className="text-2xl font-heading font-medium mb-4 mt-8">Our Commitment</h2>
            <p>
              At Chrono, we're committed to sustainable practices and ethical manufacturing. 
              We use responsibly sourced materials and ensure fair working conditions throughout 
              our supply chain. When you choose a Chrono watch, you're not just choosing exceptional 
              quality; you're also supporting a company that values people and the planet.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-heading font-medium mb-4">Our Values</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Craftsmanship and quality above all</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Innovation balanced with tradition</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Customer satisfaction through exceptional service</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Environmental and social responsibility</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-heading font-medium mb-4">Our Guarantee</h3>
              <p className="mb-4">
                We stand behind every watch we sell with a comprehensive guarantee:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>5-year movement warranty</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Free service check after 2 years</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>30-day satisfaction guarantee</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
