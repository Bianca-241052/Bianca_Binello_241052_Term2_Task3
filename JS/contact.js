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
    showToast(`Thank you, ${name}, for your message!`, "Email Sent");
}
});
