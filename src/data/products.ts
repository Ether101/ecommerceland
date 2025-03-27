
import { Product } from "@/components/ProductCard";

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Classic Chronograph",
    price: 299.99,
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1000",
    description: "Elegant chronograph watch with a stainless steel case and genuine leather strap. Features three sub-dials and water resistance up to 100m."
  },
  {
    id: "2",
    name: "Minimalist Quartz",
    price: 179.99,
    category: "Casual",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000",
    description: "Clean and minimalist design with a thin profile. Japanese quartz movement and sapphire crystal glass for everyday elegance."
  },
  {
    id: "3",
    name: "Diver's Automatic",
    price: 449.99,
    category: "Sport",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1000",
    description: "Professional dive watch with automatic movement and unidirectional rotating bezel. Water resistant to 300m with luminous hands and markers."
  },
  {
    id: "4",
    name: "Smart Watch Pro",
    price: 329.99,
    category: "Smart",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=1000",
    description: "Advanced smartwatch with health monitoring, GPS, and a week-long battery life. Compatible with iOS and Android devices."
  },
  {
    id: "5",
    name: "Vintage Mechanical",
    price: 599.99,
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1000",
    description: "Hand-wound mechanical movement with exhibition case back. Inspired by classic timepieces from the 1960s with domed crystal."
  },
  {
    id: "6",
    name: "Field Watch",
    price: 249.99,
    category: "Casual",
    image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1000",
    description: "Rugged and reliable field watch with luminous dial and date function. Canvas strap and sturdy construction for everyday adventures."
  },
  {
    id: "7",
    name: "Ceramic Chronometer",
    price: 799.99,
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000",
    description: "COSC-certified chronometer with ceramic bezel and bracelet. Exceptional accuracy and scratch resistance with sophisticated design."
  },
  {
    id: "8",
    name: "Sports Tracker",
    price: 279.99,
    category: "Sport",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000",
    description: "Multi-sport watch with GPS, heart rate monitor, and advanced metrics for runners, swimmers, and cyclists. 50+ sport modes."
  }
];

export const CATEGORIES = [
  {
    id: "1",
    name: "Luxury",
    slug: "luxury",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000"
  },
  {
    id: "2",
    name: "Sport",
    slug: "sport",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000"
  },
  {
    id: "3",
    name: "Smart",
    slug: "smart",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=1000"
  },
  {
    id: "4",
    name: "Casual",
    slug: "casual",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000"
  }
];

export const TESTIMONIALS = [
  {
    id: "1",
    text: "I've worn my Classic Chronograph for 2 years now and it still looks brand new. The quality is exceptional.",
    author: "James Wilson",
    role: "Executive"
  },
  {
    id: "2",
    text: "Their customer service is as precise as their watches. When my timepiece needed maintenance, they handled it with care.",
    author: "Michael Chen",
    role: "Architect"
  },
  {
    id: "3",
    text: "I switched from a big brand to one of their mechanical watches and I couldn't be happier with the craftsmanship.",
    author: "Emily Rodriguez",
    role: "Designer"
  }
];

export const ORDERS = [
  {
    id: "ORD-001",
    date: "2023-06-15",
    status: "Delivered",
    items: [
      { id: "1", name: "Classic Chronograph", price: 299.99, quantity: 1 },
      { id: "4", name: "Smart Watch Pro", price: 329.99, quantity: 1 }
    ],
    total: 629.98
  },
  {
    id: "ORD-002",
    date: "2023-07-20",
    status: "Shipped",
    items: [
      { id: "6", name: "Field Watch", price: 249.99, quantity: 2 }
    ],
    total: 499.98
  },
  {
    id: "ORD-003",
    date: "2023-08-05",
    status: "Processing",
    items: [
      { id: "5", name: "Vintage Mechanical", price: 599.99, quantity: 1 },
      { id: "2", name: "Minimalist Quartz", price: 179.99, quantity: 2 }
    ],
    total: 959.97
  }
];
