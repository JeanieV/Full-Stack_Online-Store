import './src/css/home.css';
import { supabase } from "./supabase";

// Connecting to the Supabase database
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



// Get the button:
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
// Empty Shopping Cart
// -----------------

const cartView = document.getElementById("myModal");

function emptyShoppingCart() {
  // Clear the current modal before showing a new modal
  cartView.innerHTML = '';

  const centerCartDiv = document.createElement("div");
  centerCartDiv.classList.add("d-flex", "justify-content-center", "align-items-center", "my-5");

  // Creating constants that will show the modal for every product
  const mycart = document.createElement("div");
  mycart.classList.add("content-cart", "mx-5", "mt-5");

  // Creating the close button on the modal
  const buttonClose = document.createElement("span");
  buttonClose.classList.add("close", "p-2");
  buttonClose.innerHTML = "&times";

  buttonClose.addEventListener("click", () => {
    cartView.style.display = 'none';
  });

  // Creating the Heading
  const invoiceName = document.createElement("h2");
  invoiceName.classList.add("heading2Modal", "pb-2");
  invoiceName.innerHTML = "Invoice";

  // Creating a date for the invoice
  const centerDiv1 = document.createElement('div');
  centerDiv1.classList.add("col-md-12", "text-center")

  const cartDate = document.createElement("p");
  cartDate.innerHTML = "Date: " + new Date().toLocaleDateString();
  cartDate.classList.add("invoice-date");

  // Appending the cartDate to the div
  centerDiv1.appendChild(cartDate);

  // Getting the fullname from the localStorage
  const fullname = localStorage.getItem('loggedInFullName');

  // Creating a customerName element if the fullname is available
  if (fullname) {
    const customerName = document.createElement("h2");
    customerName.classList.add("heading2Modal", "pb-2");
    customerName.textContent = `Hi there, ${fullname}!`;
    // Appending the customerName to the centerDiv
    centerDiv1.appendChild(customerName);
  } else {
    // Handle the case when fullname is not found in localStorage
    const noFullnameMessage = document.createElement("p");
    noFullnameMessage.textContent = 'Welcome!';
    centerDiv1.appendChild(noFullnameMessage);
  }

  // Creating the paragraph
  const newparagraph = document.createElement("p");
  newparagraph.classList.add("tableData");
  newparagraph.innerHTML = `Your shopping cart is currently empty. <br> Kindly click on the button below to start your shopping journey.`;

  const centerDiv = document.createElement('div');
  centerDiv.classList.add("col-md-12", "text-center", "py-5");

  // Creating the Go to Cart button inside the modal
  const shoppingButton = document.createElement("button");
  shoppingButton.classList.add("btn", "purchaseButton", "p-3");
  shoppingButton.innerHTML = "Continue shopping";

  shoppingButton.addEventListener('click', () => {
    cartView.style.display = 'none';
  });

  centerDiv.appendChild(shoppingButton);
  // Appending to the cart
  mycart.appendChild(buttonClose);
  mycart.appendChild(invoiceName);
  mycart.appendChild(centerDiv1);
  mycart.appendChild(newparagraph);
  mycart.appendChild(centerDiv);

  // The modal display
  centerCartDiv.appendChild(mycart);
  cartView.appendChild(centerCartDiv);

  cartView.style.display = "block";
}

// If the user clicks on the shopping cart button (and the cart is empty)
const shoppingCart = document.getElementById('shoppingCart');
shoppingCart.addEventListener('click', () => {
  emptyShoppingCart();
});



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