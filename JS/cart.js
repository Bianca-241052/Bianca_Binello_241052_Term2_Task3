// Get the base URL to ensure proper navigation from different directories
function getBaseUrl() {
  const currentUrl = window.location.href;
  const pathArray = window.location.pathname.split('/');
  const lastPath = pathArray[pathArray.length - 1];
  const baseUrl = currentUrl.replace(lastPath, '');
  return baseUrl;
}

// Helper function to format number to price string
function formatPrice(number) {
  if(number === undefined || number ===null || number === 0 || number === "")
    return '';
  return 'R ' + number.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}


// Function to add an item to the cart
function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if the SKU already exists in the cart
  let itemExists = false;
  cart = cart.map(cartItem => {
      if (cartItem.sku === item.sku) {
          cartItem.quantity += item.quantity; // Update the quantity
          itemExists = true;
      }
      return cartItem;
  });

  // If the item does not exist, add it to the cart
  if (!itemExists) {
      cart.push(item);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  showToast('Item added to cart!');
  updateBadge();
  return cart.length;
}

function getCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart.length;
}

function showToast(message, title = 'Notification', type = 'info') {
  const toast = document.createElement('div');
  toast.classList.add('toast', 'align-items-center', 'text-bg-' + type);
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');

  toast.innerHTML = `
      <div class="d-flex">
          <div class="toast-body">
              <strong>${title}</strong><br>${message}
          </div>
          <button type="button" class="btn-close mr-3" data-bs-dismiss="toast" aria-label="Close">X</button>
      </div>
  `;

  document.getElementById('toastContainer').appendChild(toast);

  var bsToast = new bootstrap.Toast(toast);
  bsToast.show();

  toast.addEventListener('hidden.bs.toast', () => {
      toast.remove();
  });
}

// Function to update the badge number
function updateBadge() {
  const cartCount = getCartCount();
  const badge = document.querySelector('#cartButton .badge');
  badge.textContent = cartCount === 0 ? '' : cartCount;
}

// Function to render cart items in the modal
function renderCartItemsOnModal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartModalBody = document.querySelector('#cartModal .modal-body');
  cartModalBody.innerHTML = ''; // Clear previous content

  if (cart.length === 0) {
      cartModalBody.innerHTML = '<p>Your cart is empty.</p>';
      return;
  }

  let baseUrl = getBaseUrl().split('#')[0];
  baseUrl += getBaseUrl().includes('pages') ? '' : 'pages/'

  const total = cart.reduce((acc, item) => {
      const flight = flights.find(flight => flight.sku === item.sku);
      return acc + (flight.currentPrice * item.quantity);
  }, 0);

  cart.forEach(item => {
      const flight = flights.find(flight => flight.sku === item.sku);
      const imagePath = baseUrl + flight.image; 
      const cartItemHtml = `
          <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div class="d-flex flex-row align-items-center col-sm-8 p-0">
                  <div class="col-sm-3 p-0">
                    <img src="${imagePath }" class="img-fluid rounded-3" alt="${flight.title}" style="width: 65px;">
                  </div>
                  <div class="col-sm-9 p-0">
                    <h5>${flight.title}</h5>
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center col-sm-4 p-0">
                  <div class="col-sm-4 p-0" >
                    <h5 class="fw-normal mb-0" style="text-wrap: nowrap;">qty: ${item.quantity}</h5>
                  </div>
                  <div class="col-sm-7 p-0">
                    <h5 class="mb-0" style="text-wrap: nowrap;">${formatPrice(flight.currentPrice)}</h5>
                  </div>
                  <a href="#!" class="remove-item col-sm-1 p-0" data-sku="${item.sku}" style="color: #cecece;">
                    X
                  </a>
                </div>
              </div>
            </div>
          </div>
      `;
      cartModalBody.insertAdjacentHTML('beforeend', cartItemHtml);
  });

  document.getElementById('totalCheckout').innerHTML = 'Total: ' + formatPrice(total);

  // Add event listeners for remove buttons
  document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', function() {
          removeCartItem(button.getAttribute('data-sku'));
      });
  });
}

function checkoutSuccess() {
  const cartModalBody = document.querySelector('#cartModal .modal-body');
  cartModalBody.innerHTML = '<p>Congratulations!<br/>A consultant will contact you shortly.</p>';
}

// Function to remove an item from the cart
function removeCartItem(sku) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.sku !== sku);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItemsOnModal();
  updateBadge();
}


// Event listener for cart button to open modal and render cart items
document.getElementById('cartButton').addEventListener('click', function() {
  renderCartItemsOnModal();
  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
  cartModal.show();
});

// Event listener for cart button to open modal and render cart items
document.getElementById('viewCart')?.addEventListener('click', function() {
  renderCartItemsOnModal();
  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
  cartModal.show();
});

document.getElementById('checkoutBtn')?.addEventListener('click', function() {
  checkoutSuccess();
});

updateBadge();