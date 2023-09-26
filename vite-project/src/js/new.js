import { showCart } from "./helper";

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
// Calling the Cart Section
// -----------------

// If the user clicks on the shopping cart button (and the cart is empty)
const shoppingCart = document.getElementById('shoppingCart');
shoppingCart.addEventListener('click', () => {
  showCart();
});