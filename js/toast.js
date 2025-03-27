
// Toast notification system
class ToastManager {
  constructor() {
    this.container = document.getElementById('toast-container');
  }

  createToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = message;
    
    this.container.appendChild(toast);
    
    // Automatically remove toast after duration
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        this.container.removeChild(toast);
      }, 300);
    }, duration);
    
    return toast;
  }
  
  success(message, duration) {
    return this.createToast(message, 'success', duration);
  }
  
  error(message, duration) {
    return this.createToast(message, 'error', duration);
  }
  
  info(message, duration) {
    return this.createToast(message, 'info', duration);
  }
}

// Create global toast instance
const toast = new ToastManager();
