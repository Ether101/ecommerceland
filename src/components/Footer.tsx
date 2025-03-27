
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-12 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <h2 className="font-heading text-xl font-semibold mb-4">Minimalist</h2>
          <p className="text-gray-400 text-sm max-w-xs">
            Premium quality products with minimalist design principles, focused on simplicity, functionality and beauty.
          </p>
        </div>
        
        <div>
          <h3 className="font-heading text-sm uppercase tracking-wider mb-4">Shop</h3>
          <ul className="space-y-2">
            <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors text-sm">All Products</Link></li>
            <li><Link to="/products?category=apparel" className="text-gray-400 hover:text-white transition-colors text-sm">Apparel</Link></li>
            <li><Link to="/products?category=accessories" className="text-gray-400 hover:text-white transition-colors text-sm">Accessories</Link></li>
            <li><Link to="/products?category=home" className="text-gray-400 hover:text-white transition-colors text-sm">Home</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-heading text-sm uppercase tracking-wider mb-4">Company</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
            <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</Link></li>
            <li><Link to="/sustainability" className="text-gray-400 hover:text-white transition-colors text-sm">Sustainability</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-heading text-sm uppercase tracking-wider mb-4">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/shipping" className="text-gray-400 hover:text-white transition-colors text-sm">Shipping</Link></li>
            <li><Link to="/returns" className="text-gray-400 hover:text-white transition-colors text-sm">Returns</Link></li>
            <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">FAQ</Link></li>
            <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Minimalist. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Instagram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Pinterest</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
