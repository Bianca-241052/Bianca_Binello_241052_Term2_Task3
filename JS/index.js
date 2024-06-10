  //js to make book a trip now button on home page go to flights page 
  document.addEventListener("DOMContentLoaded", () => {
    const bookTripBtn = document.querySelectorAll('.btn-light');
  
    for(let btn of bookTripBtn) {
        btn.addEventListener('click', () => {
            window.location.href = './pages/flights.html';
        });
    }
  });