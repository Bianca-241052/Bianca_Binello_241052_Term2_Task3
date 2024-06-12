
  // Create the HTML for the front-end

const months = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
];

function getToAndFromDate (fromDate, toDate) {

  const formatDate = (date) => {
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} ${month}`;
  };

  return `${formatDate(fromDate)} - ${formatDate(toDate)}`;
};

// Helper function to format number to price string
function formatPrice(number) {
  if(number === undefined || number ===null || number === "")
    return '';
  return 'R ' + number.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Generate the HTML for the flight data
function generateFlightHTML(flight) {
  return `
    <div class="Flight-Info" id="${flight.sku}">
      <div class="col-lg-5" style="text-align: center;">
        <img class="img-fluid" src="${flight.image}" alt="${flight.title}">
      </div>
      <div class="col-lg-7">
        <h1 class="marsText">${flight.title}</h1>
        <div class="pricing">
          <p>${formatPrice(flight.currentPrice)}</p>
          <p class="ml-2"><s>${formatPrice(flight.originalPrice)}</s></p>
        </div>
        <div class="review">
          <span class="rating">${'&#9733;'.repeat(flight.rating)}${'&#9734;'.repeat(5 - flight.rating)}</span>
          <div class="pipe"></div>
          <p class="review">${flight.reviews} Customer Review${flight.reviews > 1 ? 's' : ''}</p>
        </div>
        <p class="whitep">${flight.description.replace(/\n/g, '<br>')}</p>
        <div class="button-group">
          <div class="qtaBox">
            <p class="minus-btn mr-1">-</p>
            <input value="${flight.quantity}" class="info-btn" data-sku="${flight.sku}" />
            <p class="plus-btn ml-1">+</p>
          </div>
          <button class="btn-style book-btn" data-sku="${flight.sku}">Book Now</button>
        </div>
        <hr style="color:gray;background-color:gray;width: 100%;">
        <div class="details">
          <p class="detail-grid-container"><span>SKU</span><span>:</span><span>${flight.sku}</span></p>
          <p class="detail-grid-container"><span>Shuttle</span><span>:</span><span>${flight.shuttle}</span></p>
          <p class="detail-grid-container"><span>Tags</span><span>:</span><span>${flight.tags.join(', ')}</span></p>
          <p class="detail-grid-container"><span>Date</span><span>:</span><span>${getToAndFromDate(flight.fromDate, flight.toDate)}</span></p>
        </div>
      </div>
    </div>
  `;
}

// Add the HTML to the front-end
function renderFlights(flights) {
  const container = document.getElementById('flight-container');
  container.innerHTML = flights.map(flight => generateFlightHTML(flight)).join('');

  // Add event listeners to the "+" and "-" buttons
  const minusButtons = document.querySelectorAll('.minus-btn');
  const plusButtons = document.querySelectorAll('.plus-btn');
  const quantityInputs = document.querySelectorAll('.info-btn');

  minusButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      let quantity = parseInt(quantityInputs[index].value);
      if (quantity > 1) {
        quantity--;
        quantityInputs[index].value = quantity;
      }
    });
  });

  plusButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      let quantity = parseInt(quantityInputs[index].value);
      quantity++;
      quantityInputs[index].value = quantity;
    });
  });

  // Add event listeners to the "Book Now" buttons
  const bookButtons = document.querySelectorAll('.book-btn');
  bookButtons.forEach(button => {
    button.addEventListener('click', () => {
      const sku = button.dataset.sku;
      const quantityInput = button.parentElement.querySelector('.info-btn');
      const quantity = parseInt(quantityInput.value);
      const cartItem = { sku, quantity };
      addToCart(cartItem);
    });
  });
}

// Render the flights
renderFlights(flights);

// Search function
function searchFlights(flights, searchString) {
  const searchTerm = searchString.toLowerCase();
  return flights.filter(flight => {
    const { title, tags, shuttle, date, description } = flight;
    const titleMatch = title.toLowerCase().includes(searchTerm);
    const tagsMatch = tags.some(tag => tag.toLowerCase().includes(searchTerm));
    const shuttleMatch = shuttle.toLowerCase().includes(searchTerm);
    const descriptionMatch = description.toLowerCase().includes(searchTerm);

    return titleMatch || tagsMatch || shuttleMatch || descriptionMatch;
  });
}

// Sort function
function sortFlights(flights, sortBy) {
  switch (sortBy) {
    case 'price':
      return flights.sort((a, b) => parseFloat(a.currentPrice) - parseFloat(b.currentPrice));
    case 'rating':
      return flights.sort((a, b) => b.rating - a.rating);
    case 'tags':
      return flights.sort((a, b) => a.tags.join(',').localeCompare(b.tags.join(',')));
    case 'date':
      return flights.sort((a, b) => new Date(a.fromDate) - new Date(b.fromDate));
    case 'shuttle':
      return flights.sort((a, b) => a.shuttle.localeCompare(b.shuttle));
    default:
      return flights;
  }
}

// Event listener for dropdown items
document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', function(event) {
    event.preventDefault();
    const selectedText = this.textContent;
    const dropdownButton = document.getElementById('dropdownMenuButton');
    dropdownButton.textContent = selectedText; // Update the button text

    const sortBy = this.getAttribute('data-sort').toLowerCase();
    const sortedFlights = sortFlights([...flights], sortBy); // Use spread operator to avoid mutating original array
    renderFlights(sortedFlights);
  });
});