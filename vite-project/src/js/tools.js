import { Product } from '../js/products';
import { addToCart } from '../js/helper';
import { showModal } from '../js/helper';
import { emptyShoppingCart } from '../js/helper';

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
        showModal(product[index]); 
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
  document.documentElement.scrollTop = 500; // For Chrome, Firefox, IE and Opera
}


// -----------------
// Product cards section
// -----------------

function generateProductCard(product) {

  // Create the card container
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("homeCard", "container", "mt-5", "mb-5", "col-sm-3");

  // Create the card itself
  const card = document.createElement("div");
  card.classList.add("card1", "p-3");

  // Create the image element
  const image = document.createElement("img");
  image.classList.add("productImage");
  image.src = product.getImage;
  image.alt = product.getName;
  image.loading = "lazy";

  // Create the card body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "pt-3");

  // Create the product title
  const title = document.createElement("h3");
  title.classList.add("card-title");
  title.textContent = product.getName;

  // Create the product barcode
  const barcode = document.createElement("h5");
  barcode.classList.add("card-title");
  barcode.textContent = product.getBarcode;


  // Create the product price
  const price = document.createElement("h4");
  price.classList.add("card-text", "p-3");
  price.textContent = `R ${product.getPrice} each`;

  // "Read More" button
  const readMoreButton = document.createElement("button");
  readMoreButton.classList.add("btn", "cardButtons", "readMore", "p-2", "mx-2");
  readMoreButton.textContent = "Read More";

  // "Add to Cart" button
  const addToCartButton = document.createElement("button");
  addToCartButton.classList.add("btn", "cardButtons", "addToCart", "p-2", "mx-2");
  addToCartButton.textContent = "Add to Cart";

  addToCartButton.addEventListener('click', addToCart);

  // Append elements to the card body
  cardBody.appendChild(title);
  cardBody.appendChild(barcode);
  cardBody.appendChild(price);
  cardBody.appendChild(readMoreButton);
  cardBody.appendChild(addToCartButton);

  // Append elements to the card
  card.appendChild(image);
  card.appendChild(cardBody);

  // Append the card to the card container
  cardContainer.appendChild(card);

  // Return the card container
  return cardContainer;
}


// -----------------
// Sorting section
// -----------------

//The products will be sorted automatically in alphabetical order
const alphabeticallySort = document.querySelector(".alphabetically");
alphabeticallySort.addEventListener('click', sortProducts);

function sortProducts() {

  const cardsAlphabetically = Array.from(document.querySelectorAll('.homeCard'));
  cardsAlphabetically.sort((a, b) => {
    const titleA = a.querySelector('h3').textContent;
    const titleB = b.querySelector('h3').textContent;
    return titleA.localeCompare(titleB);
  });

  const containerAlphabetically = document.querySelector('.allCards');
  containerAlphabetically.innerHTML = '';
  cardsAlphabetically.forEach(cardsAlphabetically => containerAlphabetically.appendChild(cardsAlphabetically));
}

//The products price will be sorted from low to high
const lowSort = document.querySelector(".lowToHigh");
lowSort.addEventListener('click', sortProductsLow);

function sortProductsLow() {
  const cardsLow = Array.from(document.querySelectorAll('.homeCard'));
  cardsLow.sort((a, b) => {
    const priceA = parseFloat(a.querySelector('h4').textContent.replace('R ', ''));
    const priceB = parseFloat(b.querySelector('h4').textContent.replace('R ', ''));
    return priceA - priceB;
  });
  const containerLow = document.querySelector('.allCards');
  containerLow.innerHTML = '';
  cardsLow.forEach(card => containerLow.appendChild(card));
}


//The products price will be sorted from high to low
const sortButtonHighToLow = document.querySelector(".highToLow");
sortButtonHighToLow.addEventListener('click', sortProductsHigh);

function sortProductsHigh() {
  const cardsLow = Array.from(document.querySelectorAll('.homeCard'));
  cardsLow.sort((a, b) => {
    const priceA = parseFloat(a.querySelector('h4').textContent.replace('R ', ''));
    const priceB = parseFloat(b.querySelector('h4').textContent.replace('R ', ''));
    return priceB - priceA;
  });
  const containerLow = document.querySelector('.allCards');
  containerLow.innerHTML = '';
  cardsLow.forEach(card => containerLow.appendChild(card));
}


