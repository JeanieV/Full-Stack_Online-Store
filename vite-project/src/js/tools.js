import { Product } from '../js/classes';
import { addToCart, showModal, showCart, generateProductCard, sortProducts, sortProductsHigh, sortProductsLow, filterProducts } from '../js/helper';

// -----------------
// Connection to Supabase
// -----------------

// Function to fetch and use data
const fetchData = async () => {

  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.style.display = "block";

  try {
    // Fetch products from the Supabase database using the Tools class
    const product = await Product.fetchAll("tools");
    console.log(product);

    // Hide the loading indicator once data is fetched
    loadingIndicator.style.display = "none";

    // Generate and display product cards
    const cardContainer = document.querySelector(".allCards");
    product.forEach((product) => {
      const productCard = generateProductCard(product);
      cardContainer.appendChild(productCard);
    });

    // The showModal will display when the user clicks on the Read More Button
    const readMoreButtons = document.querySelectorAll('.readMore');

    readMoreButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        localStorage.setItem("productID", product[index].getProductId);
        localStorage.setItem("productCategory", product[index].getCategory);
        localStorage.setItem("price", product[index].getPrice);
        showModal(product[index]);
      });
    });

    // The product with the correct id will be added to the orders table
    const addToCartButtons = document.querySelectorAll('.addToCart');

    addToCartButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        localStorage.setItem("productID", product[index].getProductId);
        localStorage.setItem("productCategory", product[index].getCategory);
        localStorage.setItem("price", product[index].getPrice);
        addToCart();
      });
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Call the fetchData function to initiate data fetching
fetchData();


// -----------------
// Back to top button
// -----------------

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
  document.documentElement.scrollTop = 500;
}


// -----------------
// Calling the Sort Section
// -----------------

//The products will be sorted automatically in alphabetical order
const alphabeticallySort = document.querySelector(".alphabetically");
alphabeticallySort.addEventListener('click', sortProducts);

//The products price will be sorted from low to high
const lowSort = document.querySelector(".lowToHigh");
lowSort.addEventListener('click', sortProductsLow);

//The products price will be sorted from high to low
const sortButtonHighToLow = document.querySelector(".highToLow");
sortButtonHighToLow.addEventListener('click', sortProductsHigh);


// Creating the constants
const clear = document.querySelector('.clear-filter-button');
const searchButton = document.getElementById('searchButton');

// If the user clicks the search button
searchButton.addEventListener('click', () => {
  filterProducts(); // Call the filter function when the button is clicked
});

// If the user clicks the clear button
clear.addEventListener('click', () => {
  const searchInput = document.getElementById('searchInput');
  searchInput.value = '';
  filterProducts();
});

// -----------------
// Calling the Cart Section
// -----------------

// If the user clicks on the shopping cart button (and the cart is empty)
const shoppingCart = document.getElementById('shoppingCart');
shoppingCart.addEventListener('click', () => {
  showCart();
});
