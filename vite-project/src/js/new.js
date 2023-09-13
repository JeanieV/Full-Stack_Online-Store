// Coming Soon time interval part

const seconds = document.querySelector(".seconds .number"),
  minutes = document.querySelector(".minutes .number"),
  hours = document.querySelector(".hours .number"),
  days = document.querySelector(".days .number");

let secValue = 11,
  minValue = 2,
  hourValue = 2,
  dayValue = 10;

const timeFunction = setInterval(() => {
  secValue--;

  if (secValue === 0) {
    minValue--;
    secValue = 60;
  }
  if (minValue === 0) {
    hourValue--;
    minValue = 60;
  }
  if (hourValue === 0) {
    dayValue--;
    hourValue = 24;
  }

  if (dayValue === 0) {
    clearInterval(timeFunction);
  }
  seconds.textContent = secValue < 10 ? `0${secValue}` : secValue;
  minutes.textContent = minValue < 10 ? `0${minValue}` : minValue;
  hours.textContent = hourValue < 10 ? `0${hourValue}` : hourValue;
  days.textContent = dayValue < 10 ? `0${dayValue}` : dayValue;
}, 1000); 


// Get the button:
let backToTop = document.getElementById("backToTopButton");

backToTop.addEventListener("click", topFunction);

// When the user scrolls down 80px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

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