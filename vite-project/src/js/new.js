// Coming Soon section
const seconds = document.querySelector(".seconds .number");
const minutes = document.querySelector(".minutes .number");
const hours = document.querySelector(".hours .number");
const days = document.querySelector(".days .number");

// Check if there is a stored end time in localStorage
let endTime = localStorage.getItem("timerEndTime");

// If no end time is found or if the end time has passed, calculate a new end time
if (!endTime || new Date().getTime() > endTime) {
  const currentTime = new Date().getTime();
  endTime = currentTime + 20 * 24 * 60 * 60 * 1000; // 20 days in milliseconds
  localStorage.setItem("timerEndTime", endTime);
}

const timeFunction = setInterval(() => {
  const currentTime = new Date().getTime();
  const timeRemaining = endTime - currentTime;

  if (timeRemaining <= 0) {
    clearInterval(timeFunction);
    seconds.textContent = "00";
    minutes.textContent = "00";
    hours.textContent = "00";
    days.textContent = "00";
    localStorage.removeItem("timerEndTime"); // Remove the end time from localStorage
  } else {
    const secValue = Math.floor((timeRemaining / 1000) % 60);
    const minValue = Math.floor((timeRemaining / 60000) % 60);
    const hourValue = Math.floor((timeRemaining / 3600000) % 24);
    const dayValue = Math.floor(timeRemaining / 86400000);

    seconds.textContent = secValue < 10 ? `0${secValue}` : secValue;
    minutes.textContent = minValue < 10 ? `0${minValue}` : minValue;
    hours.textContent = hourValue < 10 ? `0${hourValue}` : hourValue;
    days.textContent = dayValue < 10 ? `0${dayValue}` : dayValue;
  }
}, 1000);

// Clear the localstorage with localstorage.clear() if the date needs to change


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


// -----------------
// Empty Shopping Cart
// -----------------

const cartView = document.getElementById("myModal");

function emptyShoppingCart() {

  //Clear the current modal before showing a new modal
  cartView.innerHTML = '';

  const centerCartDiv = document.createElement("div");
  centerCartDiv.classList.add("d-flex", "justify-content-center", "align-items-center", "my-5");

  // Creating constants that will show the modal for every product
  const mycart = document.createElement("div");
  mycart.classList.add("content-cart", "mx-5", "mt-5");

  //Creating the close button on the modal
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
    const noFullnameMessage = document.createElement("h2");
    noFullnameMessage.classList.add("heading2Modal", "pb-2");
    noFullnameMessage.textContent = 'Welcome!';
    centerDiv1.appendChild(noFullnameMessage);
  }
  
  // Creating the paragraph
  const newparagraph = document.createElement("p");
  newparagraph.classList.add("tableData");
  newparagraph.innerHTML = `Your shopping cart is currently empty. <br> Kindly click on the button below to start your shopping journey!`

  const centerDiv = document.createElement('div');
  centerDiv.classList.add("col-md-12", "text-center", "py-5");

  // Creating the Go to Cart button inside the modal
  const shoppingButton = document.createElement("button");
  shoppingButton.classList.add("btn", "purchaseButton", "p-3");
  shoppingButton.innerHTML = "Continue shopping";

  shoppingButton.addEventListener('click', () => {
    cartView.style.display = 'none';
  })

  centerDiv.appendChild(shoppingButton)
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