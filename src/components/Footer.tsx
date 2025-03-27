
import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-12 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <h2 className="font-heading text-xl font-semibold mb-4">Chrono</h2>
          <p className="text-gray-400 text-sm max-w-xs">
            Timeless elegance on your wrist. Precision engineered timepieces that combine traditional craftsmanship with modern design.
          </p>
        </div>
        
        <div>
          <h3 className="font-heading text-sm uppercase tracking-wider mb-4">Shop</h3>
          <ul className="space-y-2">
            <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors text-sm">All Watches</Link></li>
            <li><Link to="/products?category=luxury" className="text-gray-400 hover:text-white transition-colors text-sm">Luxury</Link></li>
            <li><Link to="/products?category=sports" className="text-gray-400 hover:text-white transition-colors text-sm">Sports</Link></li>
            <li><Link to="/products?category=casual" className="text-gray-400 hover:text-white transition-colors text-sm">Casual</Link></li>
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
          <h3 className="font-heading text-sm uppercase tracking-wider mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gray-400" />
              <a href="mailto:info@chronowatches.com" className="text-gray-400 hover:text-white transition-colors text-sm">info@chronowatches.com</a>
            </li>
            <li className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-400" />
              <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition-colors text-sm">+1 (555) 123-4567</a>
            </li>
            <li className="text-gray-400 text-sm">
              <span>123 Timepiece Avenue</span><br />
              <span>Watchville, CH 54321</span>
            </li>
          </ul>
          
          <div className="mt-6">
            <h4 className="text-sm mb-3">Store Hours</h4>
            <p className="text-gray-400 text-sm">Mon-Fri: 10AM - 8PM</p>
            <p className="text-gray-400 text-sm">Sat-Sun: 11AM - 6PM</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Chrono. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
