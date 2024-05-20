console.log("hello world");
console.log("I am "+ 20 + " years old");
console.log(15 + 16);

let x = 5
let y = 6
let z = x + y;

document.getElementById('math').innerHTML = "The value of Z is; " + z;

function myFunction(){
    alert ("How are you?")
}

let hour = 5;

if (hour < 12){
  console. log("Good Morning");
 } else {
  console. log("Good Afternoon");
  }

  for (let i = 0; i < 3; i++){
    let sent = "My name is Bianca";
    console. log(sent);
  }



  // carousel in home page and book now button to flights page
  document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.sliderImage');
    const leftArrow = document.getElementById('arrowLeft');
    const rightArrow = document.getElementById('arrowRight');
    const bookNowBtn = document.getElementById('bookNowBtn');
    let currentIndex = 0;
  
    function showImage(index) {
      images.forEach((img, i) => {
        img.style.display = (i === index) ? 'block' : 'none';
      });
    }
  
    leftArrow.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
      showImage(currentIndex);
    });
  
    rightArrow.addEventListener('click', () => {
      currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
      showImage(currentIndex);
    });
  
    // Initialize the carousel
    showImage(currentIndex);
  
    // Add event listener to the "Book Now" button
    bookNowBtn.addEventListener('click', () => {
      window.location.href = '../flights.html'; // Adjust the path to your flights page
    });
  });
  



    //js to make book a trip now button on home page go to flights page 
    document.addEventListener("DOMContentLoaded", () => {
      const bookTripBtn = document.querySelector('.book-trip-btn');
    
      bookTripBtn.addEventListener('click', () => {
        window.location.href = '../flights.html';
      });
    });


  //js for contact form
  const form = document.getElementById('contact');
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const subjectInput = document.getElementById('subjectInput');
  const messageInput = document.getElementById('messageInput');
  const submitButton = document.getElementById('contactSubmit');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (name === '' || email === '' || subject === '' || message === '') {
      alert('Please fill in all the required fields.');
    } else {
      // to reset the form fields
      nameInput.value = '';
      emailInput.value = '';
      subjectInput.value = '';
      messageInput.value = '';

      // Displays the thank you message
      alert(`Thank you, ${name}, for your message!`);
    }
  });









