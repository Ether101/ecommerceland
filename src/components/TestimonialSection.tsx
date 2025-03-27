
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
  className?: string;
}

const TestimonialSection = ({ testimonials, className }: TestimonialSectionProps) => {
  return (
    <section className={cn("py-20 px-6 sm:px-10 bg-gray-50", className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-heading font-medium mb-16 text-center">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={`flex flex-col bg-white p-8 rounded-lg shadow-sm animate-slide-up [animation-delay:${index * 100}ms]`}
            >
              <div className="text-3xl mb-4">"</div>
              <p className="flex-1 italic text-gray-700 mb-6">{testimonial.text}</p>
              <div>
                <div className="font-medium">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
