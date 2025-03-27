
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 flex items-center justify-center px-6 sm:px-10">
        <div className="text-center animate-fade-in">
          <h1 className="text-7xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">This page doesn't exist</p>
          <Link to="/">
            <Button size="lg">Return to Home</Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
