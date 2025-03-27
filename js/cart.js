
// Cart Management
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const cartCountElement = document.querySelector('.cart-count');
  const cartContentElement = document.getElementById('cart-content');
  const cartSummaryElement = document.getElementById('cart-summary');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');
  const checkoutButton = document.getElementById('checkout-btn');
  const backToCartButton = document.getElementById('back-to-cart');
  const shippingFormElement = document.getElementById('shipping-form');
  const checkoutForm = document.getElementById('checkout-form');
  const paymentProcessingElement = document.getElementById('payment-processing');
  const orderConfirmationElement = document.getElementById('order-confirmation');
  const paymentIconElement = document.getElementById('payment-icon');
  const paymentMessageElement = document.getElementById('payment-message');
  const orderIdElement = document.getElementById('order-id');
  
  // State
  let cartItems = [];
  let currentStage = 'cart';
  
  // Initialize
  loadCart();
  updateCartUI();
  
  // Event Listeners
  if (checkoutButton) {
    checkoutButton.addEventListener('click', handleCheckout);
  }
  
  if (backToCartButton) {
    backToCartButton.addEventListener('click', () => {
      setCheckoutStage('cart');
    });
  }
  
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handlePaymentSubmit);
  }
  
  // Functions
  function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      cartItems = JSON.parse(savedCart);
    }
    updateCartCount();
  }
  
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
  }
  
  function updateCartCount() {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    if (cartCountElement) {
      cartCountElement.textContent = count;
    }
  }
  
  function updateCartUI() {
    if (!cartContentElement) {
      console.error('Cart content element not found');
      return;
    }
    
    if (cartItems.length === 0) {
      // Show empty cart message
      cartContentElement.innerHTML = `
        <div class="empty-cart">
          <h3>Your cart is empty</h3>
          <p>Add some watches to your cart to see them here</p>
          <a href="products.html" class="btn primary">Browse Watches</a>
        </div>
      `;
      if (cartSummaryElement) {
        cartSummaryElement.classList.add('hidden');
      }
    } else {
      // Show cart items
      const cartItemsHTML = `
        <div class="cart-grid">
          <div class="cart-items">
            ${cartItems.map(item => `
              <div class="cart-item" data-id="${item.product.id}">
                <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-image">
                <div class="cart-item-details">
                  <div class="cart-item-title">${item.product.name}</div>
                  <div class="cart-item-category">${item.product.category}</div>
                  <div class="cart-item-price">$${(item.product.price * item.quantity).toFixed(2)}</div>
                  <div class="cart-item-controls">
                    <div class="quantity-control">
                      <button class="quantity-btn decrease" data-id="${item.product.id}">-</button>
                      <div class="quantity-value">${item.quantity}</div>
                      <button class="quantity-btn increase" data-id="${item.product.id}">+</button>
                    </div>
                    <button class="remove-btn" data-id="${item.product.id}">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="order-summary">
            <h2>Order Summary</h2>
            <div class="summary-item">
              <span>Subtotal</span>
              <span>$${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div class="summary-item">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div class="summary-item total">
              <span>Total</span>
              <span>$${calculateSubtotal().toFixed(2)}</span>
            </div>
            <button id="checkout-btn" class="btn primary">Proceed to Checkout</button>
          </div>
        </div>
      `;
      cartContentElement.innerHTML = cartItemsHTML;
      if (cartSummaryElement) {
        cartSummaryElement.classList.remove('hidden');
      }
      
      // Update summary
      if (subtotalElement) {
        subtotalElement.textContent = `$${calculateSubtotal().toFixed(2)}`;
      }
      if (totalElement) {
        totalElement.textContent = `$${calculateSubtotal().toFixed(2)}`;
      }
      
      // Add event listeners to quantity buttons
      document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(btn.dataset.id, -1));
      });
      
      document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(btn.dataset.id, 1));
      });
      
      // Add event listeners to remove buttons
      document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => removeItem(btn.dataset.id));
      });
      
      // Re-add event listener to checkout button
      const newCheckoutBtn = document.getElementById('checkout-btn');
      if (newCheckoutBtn) {
        newCheckoutBtn.addEventListener('click', handleCheckout);
      }
    }
  }
  
  function updateQuantity(productId, change) {
    const itemIndex = cartItems.findIndex(item => item.product.id === productId);
    if (itemIndex !== -1) {
      const newQuantity = cartItems[itemIndex].quantity + change;
      if (newQuantity < 1) return;
      
      cartItems[itemIndex].quantity = newQuantity;
      saveCart();
      updateCartUI();
    }
  }
  
  function removeItem(productId) {
    cartItems = cartItems.filter(item => item.product.id !== productId);
    saveCart();
    updateCartUI();
    toast.info('Item removed from cart');
  }
  
  function calculateSubtotal() {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }
  
  function handleCheckout(e) {
    e.preventDefault();
    setCheckoutStage('shipping');
  }
  
  function handlePaymentSubmit(e) {
    e.preventDefault();
    setCheckoutStage('payment');
    
    // Get selected payment method
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    // Simulate payment processing
    setTimeout(() => {
      if (paymentMethod === 'paypal') {
        simulatePayPalRedirect();
      } else {
        processCreditCardPayment();
      }
    }, 1000);
  }
  
  function simulatePayPalRedirect() {
    toast.info('Redirecting to PayPal...');
    
    // Update payment processing UI
    if (paymentIconElement) {
      paymentIconElement.innerHTML = `
        <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
             alt="PayPal" 
             style="width: 64px; height: auto;">
      `;
    }
    if (paymentMessageElement) {
      paymentMessageElement.textContent = 'Connecting to PayPal...';
    }
    
    // Simulate PayPal sandbox experience
    setTimeout(() => {
      // Simulate successful return from PayPal
      completeOrder();
    }, 3000);
  }
  
  function processCreditCardPayment() {
    toast.info('Processing credit card payment...');
    
    // Update payment processing UI
    if (paymentIconElement) {
      paymentIconElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
      `;
    }
    if (paymentMessageElement) {
      paymentMessageElement.textContent = 'Processing credit card payment...';
    }
    
    // Simulate payment processing
    setTimeout(() => {
      completeOrder();
    }, 2000);
  }
  
  function completeOrder() {
    setCheckoutStage('confirmation');
    
    // Generate random order number
    if (orderIdElement) {
      orderIdElement.textContent = 'CHR-' + Math.floor(Math.random() * 10000);
    }
    
    // Clear cart after successful purchase
    localStorage.removeItem('cart');
    cartItems = [];
    updateCartCount();
    
    toast.success('Payment successful! Your order has been placed.');
  }
  
  function setCheckoutStage(stage) {
    currentStage = stage;
    
    // Hide all sections
    if (cartContentElement) cartContentElement.classList.add('hidden');
    if (cartSummaryElement) cartSummaryElement.classList.add('hidden');
    if (shippingFormElement) shippingFormElement.classList.add('hidden');
    if (paymentProcessingElement) paymentProcessingElement.classList.add('hidden');
    if (orderConfirmationElement) orderConfirmationElement.classList.add('hidden');
    
    // Show appropriate section based on stage
    switch(stage) {
      case 'cart':
        if (cartContentElement) cartContentElement.classList.remove('hidden');
        if (cartItems.length > 0 && cartSummaryElement) {
          cartSummaryElement.classList.remove('hidden');
        }
        break;
      case 'shipping':
        if (shippingFormElement) shippingFormElement.classList.remove('hidden');
        break;
      case 'payment':
        if (paymentProcessingElement) paymentProcessingElement.classList.remove('hidden');
        break;
      case 'confirmation':
        if (orderConfirmationElement) orderConfirmationElement.classList.remove('hidden');
        break;
    }
  }
});
