// Product Detail Page
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const productDetailContainer = document.getElementById('product-detail');
  const cartCountElement = document.querySelector('.cart-count');
  
  // State
  let product = null;
  let cart = [];
  
  // Initialize
  loadCart();
  loadProductFromURL();
  
  // Functions
  function loadProductFromURL() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
      showError("Product not found");
      return;
    }
    
    // First try to get the product from localStorage (if coming from products page)
    const savedProduct = localStorage.getItem('selectedProduct');
    if (savedProduct) {
      try {
        const parsedProduct = JSON.parse(savedProduct);
        if (parsedProduct.id === productId) {
          product = parsedProduct;
          renderProductDetail();
          return;
        }
      } catch (e) {
        console.error('Error parsing saved product:', e);
      }
    }
    
    // If not found in localStorage, fetch it from "API" (sample data in this case)
    fetchProductById(productId);
  }
  
  function fetchProductById(productId) {
    // In a real app, this would fetch from an API
    // For this demo, we'll use sample data
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
    
    product = sampleProducts.find(p => p.id === productId);
    
    if (product) {
      renderProductDetail();
    } else {
      showError("Product not found");
    }
  }
  
  function renderProductDetail() {
    if (!product) return;
    
    document.title = `${product.name} - Chrono`;
    
    const detailHTML = `
      <div class="product-detail-grid">
        <div class="product-detail-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-detail-info">
          <h1>${product.name}</h1>
          <div class="product-detail-category">${product.category}</div>
          <div class="product-detail-price">$${product.price.toFixed(2)}</div>
          <div class="product-detail-description">${product.description}</div>
          
          <div class="quantity-selector">
            <label for="quantity">Quantity</label>
            <div class="quantity-control">
              <button id="decrease-quantity" class="quantity-btn">-</button>
              <input type="number" id="quantity" value="1" min="1" max="10">
              <button id="increase-quantity" class="quantity-btn">+</button>
            </div>
          </div>
          
          <button id="add-to-cart" class="btn primary">Add to Cart</button>
        </div>
      </div>
    `;
    
    productDetailContainer.innerHTML = detailHTML;
    
    // Add event listeners
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    const addToCartBtn = document.getElementById('add-to-cart');
    
    decreaseBtn.addEventListener('click', () => {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
    
    increaseBtn.addEventListener('click', () => {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
      }
    });
    
    addToCartBtn.addEventListener('click', () => {
      const quantity = parseInt(quantityInput.value);
      addToCart(product, quantity);
    });
  }
  
  function showError(message) {
    productDetailContainer.innerHTML = `
      <div class="error-message">
        <p>${message}</p>
        <a href="products.html" class="btn primary">Return to Products</a>
      </div>
    `;
  }
  
  function addToCart(product, quantity) {
    // Check if product is already in cart
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.push({
        product: product,
        quantity: quantity
      });
    }
    
    // Save cart to localStorage
    saveCart();
    
    // Show toast notification
    toast.success(`${quantity} ${product.name} added to cart`);
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

  // Add some product detail styling
  const style = document.createElement('style');
  style.textContent = `
    main {
      padding-top: 5rem;
      padding-bottom: 3rem;
    }

    .back-link {
      margin-bottom: 2rem;
    }

    .back-link a {
      display: inline-flex;
      align-items: center;
      font-size: 0.875rem;
    }

    .back-link svg {
      margin-right: 0.25rem;
      width: 1rem;
      height: 1rem;
    }

    .product-detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }

    .product-detail-image img {
      width: 100%;
      height: auto;
      border-radius: var(--radius);
      object-fit: cover;
    }

    .product-detail-info h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .product-detail-category {
      color: #666;
      margin-bottom: 1rem;
    }

    .product-detail-price {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }

    .product-detail-description {
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .quantity-selector {
      margin-bottom: 1.5rem;
    }

    .quantity-selector label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .quantity-control {
      display: flex;
      align-items: center;
      max-width: 10rem;
    }

    .quantity-btn {
      width: 2.5rem;
      height: 2.5rem;
      border: 1px solid hsl(var(--border));
      background: white;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: var(--radius);
    }

    .quantity-control input {
      width: 3rem;
      height: 2.5rem;
      border: 1px solid hsl(var(--border));
      text-align: center;
      margin: 0 0.5rem;
      border-radius: var(--radius);
    }

    #add-to-cart {
      padding: 0.75rem 2rem;
      font-size: 1rem;
    }

    .error-message {
      text-align: center;
      padding: 5rem 0;
    }

    .error-message p {
      margin-bottom: 1.5rem;
      font-size: 1.125rem;
    }

    .loading {
      text-align: center;
      padding: 5rem 0;
    }

    @media (max-width: 768px) {
      .product-detail-grid {
        grid-template-columns: 1fr;
      }
      
      .product-detail-image {
        margin-bottom: 1.5rem;
      }
    }
  `;
  
  document.head.appendChild(style);
});
