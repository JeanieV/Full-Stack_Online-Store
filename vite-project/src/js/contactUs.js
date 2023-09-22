import { Contact } from '../js/products';
import { supabase } from '../../supabase';
import { emptyShoppingCart } from '../js/helper';

// Add an event listener to the form submission
const contactForm = document.querySelector('#contactForm');

async function submitContactForm(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get form input values
  const name = contactForm.elements.name.value;
  const email = contactForm.elements.email.value;
  const phoneNumber = contactForm.elements.phoneNumber.value;
  const questionType = contactForm.elements.questionType.value;
  const message = contactForm.elements.message.value;

  // Create a new Contact instance
  const newContact = new Contact(name, email, phoneNumber, questionType, message);

  try {
    // Insert the new contact into the "contact" table
    const { data, error } = await supabase.from('contact').upsert([newContact]);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      alert('Thank you! \nWe will get back to your request as soon as possible.');

      // Optionally, you can reset the form after successful submission
      contactForm.reset();
    }
  } catch (error) {
    console.error('Error:', error);
  }

}

// Add an event listener to the form submission
contactForm.addEventListener('submit', submitContactForm);

// Get the button:
let backToTop = document.getElementById("backToTopButton");

backToTop.addEventListener("click", topFunction);

// When the user scrolls down 80px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.documentElement.scrollTop > 80) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.documentElement.scrollTop = 40; // For Chrome, Firefox, IE and Opera
}
