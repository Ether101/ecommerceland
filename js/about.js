
// About Page
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const cartCountElement = document.querySelector('.cart-count');
  
  // Initialize
  loadCart();
  
  // Functions
  function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      updateCartCount(cart);
    }
  }
  
  function updateCartCount(cart) {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCountElement) {
      cartCountElement.textContent = count;
    }
  }

  // Add about page specific styling
  const style = document.createElement('style');
  style.textContent = `
    /* About Hero Section */
    .about-hero {
      height: 40vh;
      min-height: 300px;
      background-image: url('https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80');
      background-size: cover;
      background-position: center;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .about-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .about-hero h1 {
      position: relative;
      font-size: 3rem;
      font-weight: 600;
    }

    /* About Content Section */
    .about-content {
      padding: 5rem 0;
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
    }

    .about-text h2 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }

    .about-text p {
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .about-image img {
      width: 100%;
      height: auto;
      border-radius: var(--radius);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    /* Values Section */
    .values {
      padding: 5rem 0;
      background-color: hsl(var(--secondary));
    }

    .values h2 {
      text-align: center;
      margin-bottom: 3rem;
      font-size: 2rem;
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .value-card {
      background-color: white;
      padding: 2rem;
      border-radius: var(--radius);
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .value-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    }

    .value-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 64px;
      height: 64px;
      margin: 0 auto 1.5rem;
      border-radius: 50%;
      background-color: hsl(var(--primary) / 0.1);
      color: hsl(var(--primary));
    }

    .value-card h3 {
      margin-bottom: 1rem;
      font-size: 1.25rem;
    }

    .value-card p {
      color: #666;
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
      .about-grid {
        grid-template-columns: 1fr;
      }
      
      .about-image {
        order: -1;
      }
      
      .about-hero h1 {
        font-size: 2.5rem;
      }
    }
  `;
  
  document.head.appendChild(style);
});
