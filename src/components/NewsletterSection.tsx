
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface NewsletterSectionProps {
  className?: string;
}

const NewsletterSection = ({ className }: NewsletterSectionProps) => {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    
    // Here you would normally send this to your API
    toast.success("Thank you for subscribing!");
    setEmail("");
  };
  
  return (
    <section className={cn("py-20 px-6 sm:px-10", className)}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-heading font-medium mb-4">Join Our Newsletter</h2>
        <p className="text-gray-600 mb-8">
          Subscribe to receive updates, access to exclusive deals, and more.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-black/20 flex-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" className="px-6">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
