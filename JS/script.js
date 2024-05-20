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



//js for contact form

  document.getElementById('contact').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the form from submitting

    // Get the values of the form fields
    var name = document.getElementById('nameInput').value;
    var email = document.getElementById('emailInput').value;
    var subject = document.getElementById('subjectInput').value;
    var message = document.getElementById('messageInput').value;

    // Displays the thank you message with the entered name
    document.getElementById('userName').textContent = name;
    document.getElementById('thankYouMessage').style.display = 'block';
    document.getElementById('contact').style.display = 'none';

  });


  