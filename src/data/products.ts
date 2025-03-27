
import { Product } from "@/components/ProductCard";

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Minimalist Watch",
    price: 149.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000",
    description: "A sleek, minimalist watch with a clean face and premium leather strap. Perfect for everyday wear and special occasions."
  },
  {
    id: "2",
    name: "Ceramic Mug",
    price: 24.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=1000",
    description: "Handcrafted ceramic mug with a minimalist design. Each piece is unique and perfect for your morning coffee or tea."
  },
  {
    id: "3",
    name: "Linen Shirt",
    price: 79.99,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000",
    description: "Premium linen shirt with a relaxed fit. Made from 100% European flax and designed for comfort and style."
  },
  {
    id: "4",
    name: "Leather Wallet",
    price: 59.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000",
    description: "Slim leather wallet with card slots and a bill compartment. Made from vegetable-tanned leather that develops a beautiful patina over time."
  },
  {
    id: "5",
    name: "Modern Lamp",
    price: 129.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000",
    description: "A modern table lamp with a minimalist design. Features a concrete base and adjustable arm for perfect lighting."
  },
  {
    id: "6",
    name: "Cotton T-Shirt",
    price: 34.99,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000",
    description: "Essential cotton t-shirt made from organic cotton. Features a relaxed fit and is available in multiple colors."
  },
  {
    id: "7",
    name: "Wooden Desk Organizer",
    price: 49.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=1000",
    description: "Handcrafted wooden desk organizer with compartments for your stationery and small items. Made from sustainable wood."
  },
  {
    id: "8",
    name: "Wool Beanie",
    price: 29.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000",
    description: "Warm and cozy wool beanie, perfect for cold weather. Made from premium merino wool for comfort and durability."
  }
];

export const CATEGORIES = [
  {
    id: "1",
    name: "Apparel",
    slug: "apparel",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000"
  },
  {
    id: "2",
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000"
  },
  {
    id: "3",
    name: "Home",
    slug: "home",
    image: "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1000"
  }
];

export const TESTIMONIALS = [
  {
    id: "1",
    text: "The quality of their products is exceptional. I've been a customer for years and have never been disappointed.",
    author: "Sarah Johnson",
    role: "Designer"
  },
  {
    id: "2",
    text: "Their minimalist approach to product design really resonates with me. Less is truly more.",
    author: "Michael Chen",
    role: "Architect"
  },
  {
    id: "3",
    text: "The attention to detail in every product is impressive. It's clear they care about craftsmanship.",
    author: "Emily Rodriguez",
    role: "Photographer"
  }
];

export const ORDERS = [
  {
    id: "ORD-001",
    date: "2023-06-15",
    status: "Delivered",
    items: [
      { id: "1", name: "Minimalist Watch", price: 149.99, quantity: 1 },
      { id: "4", name: "Leather Wallet", price: 59.99, quantity: 1 }
    ],
    total: 209.98
  },
  {
    id: "ORD-002",
    date: "2023-07-20",
    status: "Shipped",
    items: [
      { id: "6", name: "Cotton T-Shirt", price: 34.99, quantity: 2 }
    ],
    total: 69.98
  },
  {
    id: "ORD-003",
    date: "2023-08-05",
    status: "Processing",
    items: [
      { id: "5", name: "Modern Lamp", price: 129.99, quantity: 1 },
      { id: "2", name: "Ceramic Mug", price: 24.99, quantity: 2 }
    ],
    total: 179.97
  }
];
