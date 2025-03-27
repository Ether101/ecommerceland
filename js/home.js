
// Home Page
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const featuredProductsGrid = document.getElementById('featured-products-grid');
  const newsletterForm = document.getElementById('newsletter-form');
  const cartCountElement = document.querySelector('.cart-count');
  
  // State
  let cart = [];
  
  // Initialize
  loadCart();
  loadFeaturedProducts();
  
  // Event Listeners
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
  
  // Functions
  function loadFeaturedProducts() {
    // In a real app, this would fetch from an API
    // For this demo, we'll use some sample data
    const sampleProducts = [
      {
        id: "1",
        name: "Classic Analog Watch",
        price: 129.99,
        category: "Analog",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        description: "A timeless analog watch with a leather strap and minimalist design."
      },
      {
        id: "4",
        name: "Luxury Chronograph",
        price: 599.99,
        category: "Luxury",
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        description: "Premium chronograph watch with stainless steel case and sapphire crystal."
      },
      {
        id: "3",
        name: "Smart Watch Pro",
        price: 249.99,
        category: "Smart Watch",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        description: "Advanced smart watch with health tracking, notifications, and app support."
      }
    ];
    
    renderFeaturedProducts(sampleProducts);
  }
  
  function renderFeaturedProducts(products) {
    if (!featuredProductsGrid) return;
    
    const productsHTML = products.map(product => `
      <div class="product-card" data-id="${product.id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <div class="product-category">${product.category}</div>
          <div class="product-price">$${product.price.toFixed(2)}</div>
          <button class="add-to-cart-btn btn primary" data-id="${product.id}">
            Add to Cart
          </button>
        </div>
      </div>
    `).join('');
    
    featuredProductsGrid.innerHTML = productsHTML;
    
    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(button.dataset.id);
      });
    });
    
    // Add event listeners to product cards for navigation to detail page
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Prevent navigation if clicking the add to cart button
        if (!e.target.closest('.add-to-cart-btn')) {
          navigateToProduct(card.dataset.id);
        }
      });
    });
  }
  
  function handleNewsletterSubmit(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (email) {
      // In a real app, this would send the email to a server
      toast.success('Thank you for subscribing to our newsletter!');
      emailInput.value = '';
    }
  }
  
  function navigateToProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
  }
  
  function addToCart(productId) {
    // Fetch product data
    const product = {
      id: productId,
      name: document.querySelector(`.product-card[data-id="${productId}"] .product-name`).textContent,
      price: parseFloat(document.querySelector(`.product-card[data-id="${productId}"] .product-price`).textContent.replace('$', '')),
      category: document.querySelector(`.product-card[data-id="${productId}"] .product-category`).textContent,
      image: document.querySelector(`.product-card[data-id="${productId}"] img`).src,
      description: "Premium quality watch with minimalist design."
    };
    
    // Check if product is already in cart
    const existingItemIndex = cart.findIndex(item => item.product.id === productId);
    
    if (existingItemIndex >= 0) {
      // Increment quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new item
      cart.push({
        product: product,
        quantity: 1
      });
    }
    
    // Save cart to localStorage
    saveCart();
    
    // Show toast notification
    toast.success(`${product.name} added to cart`);
  }
  
  function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
    updateCartCount();
  }
  
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }
  
  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCountElement) {
      cartCountElement.textContent = count;
    }
  }

  // Add home page specific styling
  const style = document.createElement('style');
  style.textContent = `
    /* Hero Section */
    .hero {
      height: 80vh;
      min-height: 500px;
      background-image: url('https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80');
      background-size: cover;
      background-position: center;
      position: relative;
      display: flex;
      align-items: center;
      color: white;
    }

    .hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .hero-content {
      position: relative;
      max-width: 600px;
      margin-left: 10%;
      padding: 2rem;
    }

    .hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .hero p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    /* Featured Products Section */
    .featured-products {
      padding: 5rem 0;
    }

    .featured-products h2 {
      text-align: center;
      margin-bottom: 3rem;
      font-size: 2rem;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .product-card {
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius);
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    .product-image {
      height: 200px;
      overflow: hidden;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .product-card:hover .product-image img {
      transform: scale(1.05);
    }

    .product-info {
      padding: 1.5rem;
    }

    .product-name {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }

    .product-category {
      font-size: 0.875rem;
      color: #666;
      margin-bottom: 0.5rem;
    }

    .product-price {
      font-weight: 600;
      font-size: 1.125rem;
      margin-bottom: 1rem;
    }

    .view-all {
      text-align: center;
    }

    /* Categories Section */
    .categories {
      padding: 5rem 0;
      background-color: hsl(var(--secondary));
    }

    .categories h2 {
      text-align: center;
      margin-bottom: 3rem;
      font-size: 2rem;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .category-card {
      position: relative;
      border-radius: var(--radius);
      overflow: hidden;
      aspect-ratio: 4/3;
      transition: transform 0.2s;
    }

    .category-card:hover {
      transform: translateY(-5px);
    }

    .category-image {
      position: absolute;
      inset: 0;
    }

    .category-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .category-card:hover .category-image img {
      transform: scale(1.05);
    }

    .category-name {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1.5rem;
      background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
      color: white;
      font-size: 1.25rem;
      font-weight: 500;
    }

    /* Newsletter Section */
    .newsletter {
      padding: 5rem 0;
      text-align: center;
    }

    .newsletter h2 {
      margin-bottom: 1rem;
      font-size: 2rem;
    }

    .newsletter p {
      margin-bottom: 2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      color: #666;
    }

    .newsletter-form {
      display: flex;
      max-width: 500px;
      margin: 0 auto;
    }

    .newsletter-form input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius) 0 0 var(--radius);
    }

    .newsletter-form button {
      border-radius: 0 var(--radius) var(--radius) 0;
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
      .hero-content {
        margin-left: 5%;
        margin-right: 5%;
      }
      
      .hero h1 {
        font-size: 2.5rem;
      }
      
      .newsletter-form {
        flex-direction: column;
      }
      
      .newsletter-form input,
      .newsletter-form button {
        width: 100%;
        border-radius: var(--radius);
      }
      
      .newsletter-form button {
        margin-top: 0.5rem;
      }
    }

    @media (max-width: 480px) {
      .hero h1 {
        font-size: 2rem;
      }
      
      .hero p {
        font-size: 1rem;
      }
    }
  `;
  
  document.head.appendChild(style);
});
