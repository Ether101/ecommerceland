
// Products Page
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const productsGrid = document.getElementById('products-grid');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cartCountElement = document.querySelector('.cart-count');
  
  // State
  let products = [];
  let filteredProducts = [];
  let currentCategory = 'all';
  let searchQuery = '';
  let cart = [];
  
  // Initialize
  loadCart();
  fetchProducts();
  
  // Event Listeners
  searchButton.addEventListener('click', handleSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active class
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter products
      currentCategory = button.dataset.category;
      filterProducts();
    });
  });
  
  // Functions
  function fetchProducts() {
    // In a real application, this would be a fetch from an API
    // For demonstration purposes, we'll use some sample data
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
        id: "2",
        name: "Digital Sports Watch",
        price: 89.99,
        category: "Digital",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        description: "Water-resistant digital watch perfect for sports and outdoor activities."
      },
      {
        id: "3",
        name: "Smart Watch Pro",
        price: 249.99,
        category: "Smart Watch",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        description: "Advanced smart watch with health tracking, notifications, and app support."
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
        id: "5",
        name: "Minimalist Steel Watch",
        price: 179.99,
        category: "Analog",
        image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        description: "Clean, minimalist design with a stainless steel mesh band."
      },
      {
        id: "6",
        name: "Fitness Tracker",
        price: 149.99,
        category: "Smart Watch",
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        description: "Dedicated fitness tracker with heart rate monitor and sleep tracking."
      }
    ];
    
    products = sampleProducts;
    filteredProducts = [...products];
    renderProducts();
  }
  
  function renderProducts() {
    if (filteredProducts.length === 0) {
      productsGrid.innerHTML = `
        <div class="no-results">
          <p>No products found matching your criteria.</p>
          <button id="reset-filters" class="btn primary">Reset Filters</button>
        </div>
      `;
      
      // Add event listener to reset button
      const resetButton = document.getElementById('reset-filters');
      if (resetButton) {
        resetButton.addEventListener('click', () => {
          searchInput.value = '';
          searchQuery = '';
          currentCategory = 'all';
          filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === 'all') {
              btn.classList.add('active');
            }
          });
          filterProducts();
        });
      }
      return;
    }
    
    const productsHTML = filteredProducts.map(product => `
      <div class="product-card" data-id="${product.id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <div class="product-category">${product.category}</div>
          <div class="product-price">$${product.price.toFixed(2)}</div>
          <p class="product-description">${product.description}</p>
          <button class="add-to-cart-btn btn primary" data-id="${product.id}">
            Add to Cart
          </button>
        </div>
      </div>
    `).join('');
    
    productsGrid.innerHTML = productsHTML;
    
    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', () => {
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
  
  function handleSearch() {
    searchQuery = searchInput.value.trim().toLowerCase();
    filterProducts();
  }
  
  function filterProducts() {
    filteredProducts = [...products];
    
    // Apply category filter
    if (currentCategory !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category === currentCategory
      );
    }
    
    // Apply search query
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery) || 
        product.description.toLowerCase().includes(searchQuery)
      );
    }
    
    renderProducts();
  }
  
  function navigateToProduct(productId) {
    // In a real app, navigate to product detail page
    // For this demo, we'll just store the product in localStorage and redirect
    const product = products.find(p => p.id === productId);
    if (product) {
      localStorage.setItem('selectedProduct', JSON.stringify(product));
      window.location.href = `product-detail.html?id=${productId}`;
    }
  }
  
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
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

  // Add some product card styling
  const style = document.createElement('style');
  style.textContent = `
    .products-section {
      padding: 2rem 0;
    }

    .products-section h1 {
      margin-bottom: 2rem;
      font-size: 1.875rem;
    }

    .products-filters {
      margin-bottom: 2rem;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
      justify-content: space-between;
    }

    .search-container {
      display: flex;
      position: relative;
      max-width: 400px;
      width: 100%;
    }

    .search-container input {
      padding: 0.75rem;
      padding-right: 3rem;
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius);
      width: 100%;
    }

    .search-container button {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 3rem;
      background: none;
      border: none;
      cursor: pointer;
      color: #666;
    }

    .category-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .filter-btn {
      padding: 0.5rem 1rem;
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius);
      background: white;
      cursor: pointer;
      font-size: 0.875rem;
    }

    .filter-btn.active {
      background-color: hsl(var(--primary));
      color: white;
      border-color: hsl(var(--primary));
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
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
      margin-bottom: 0.5rem;
    }

    .product-description {
      color: #666;
      font-size: 0.875rem;
      line-height: 1.4;
      margin-bottom: 1rem;
    }

    .loading, .no-results {
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem 0;
    }

    .no-results p {
      margin-bottom: 1rem;
    }

    @media (max-width: 768px) {
      .products-filters {
        flex-direction: column;
        align-items: stretch;
      }
      
      .search-container {
        max-width: 100%;
      }
      
      .category-filters {
        justify-content: center;
      }
    }
  `;
  
  document.head.appendChild(style);
});
