import './src/css/home.css';
import { supabase } from "./supabase";
import { emptyShoppingCart } from './src/js/helper';

// -----------------
// Connection to Supabase
// -----------------

const useData = async () => {
  try {
    showLoadingState();

    const { data, error } = await supabase.from("users").select();
    
    if (error) {
      // Handle error
    } else {
      hideLoadingState(); // Hide loading state when data is received
      return data;
    }
  } catch (error) {
    // Handle error
  }
}
const data = useData();
console.log(data);


// -----------------
// Back to top button
// -----------------

let backToTop = document.getElementById("backToTopButton");

backToTop.addEventListener("click", topFunction);

// When the user scrolls down 80px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.documentElement.scrollTop > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.documentElement.scrollTop = 800; // For Chrome, Firefox, IE and Opera
}


// -----------------
// Is the user logged in?
// -----------------

// Function to check if a user is logged in
async function checkLoggedInStatus() {
  const loggedInUsername = localStorage.getItem('loggedInUsername');
  const registerButton = document.getElementById('registerButton');
  const loginButton = document.getElementById('loginButton');
  const loggedInUsernameSpan = document.getElementById('loggedInUsernameSpan');
  const logoutUser = document.getElementById('logoutUser');

  // Get user data from Supabase
  const userData = await useData();

  if (loggedInUsername && userData) {
    // Check if the loggedInUsername exists in the userData
    const userExists = userData.some(user => user.username === loggedInUsername);

    if (userExists) {
      // User is logged in and the username exists in the database
      registerButton.style.display = 'none';
      loginButton.style.display = 'none';
      loggedInUsernameSpan.textContent = `Hi there, ${loggedInUsername}!`;
      logoutUser.style.display = 'block';

      console.log(loggedInUsername);
    } else {
      // User is not found in the database, clear the local storage
      localStorage.removeItem('loggedInUsername');
      loggedInUsernameSpan.style.display = 'none';
    }
  } else {
    // User is not logged in
    loggedInUsernameSpan.style.display = 'none';
  }
}

// Call the function to check login status when the page loads
window.addEventListener('load', () => {
  checkLoggedInStatus();
  hideLoadingState(); // Hide loading state after the page has fully loaded
});


// -----------------
// Remove localStorage
// -----------------

function logOutUser() {
  // Clear the user session data from localStorage
  localStorage.removeItem('loggedInUsername');
  localStorage.removeItem('loggedInFullName');
  localStorage.removeItem('loggedInAddress');
  localStorage.removeItem('loggedInPhoneNumber');
  localStorage.removeItem('loggedInEmail');
  localStorage.removeItem('loggedInPassword');

  // Redirect the user to the index page
  window.location.href = 'index.html';
}

// Add an event listener to the "Log Out" button
const logoutButton = document.getElementById('logoutUser');
if (logoutButton) {
  logoutButton.addEventListener('click', logOutUser);
}

// -----------------
// Loading state for user
// -----------------

// Display the loading state when a Supabase request is made
function showLoadingState() {
  const loadingState = document.getElementById("loadingState");
  loadingState.style.display = "block";
}

// Hide the loading state when content has loaded
function hideLoadingState() {
  const loadingState = document.getElementById("loadingState");
  loadingState.style.display = "none";
}

// -----------------
// Calling the Cart Section
// -----------------

// If the user clicks on the shopping cart button (and the cart is empty)
const shoppingCart = document.getElementById('shoppingCart');
shoppingCart.addEventListener('click', () => {
  emptyShoppingCart();
});
