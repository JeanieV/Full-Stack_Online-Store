import { Porcelain } from '../js/products';

// -----------------
// Connection to Supabase
// -----------------

// Function to fetch and use data
const fetchData = async () => {
 
  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.style.display = "block";

  try {
    // Fetch products from the Supabase database using the Ceramic class
    const porcelain = await Porcelain.fetchAll();
    console.log(porcelain);

    // Hide the loading indicator once data is fetched
    loadingIndicator.style.display = "none";

    // Generate and display product cards
    const cardContainer = document.querySelector(".allCards");
    porcelain.forEach((porcelain) => {
      const productCard = generateProductCard(porcelain);
      cardContainer.appendChild(productCard);
    });

    // The showModal will display when the user clicks on the Read More Button
    const readMoreButtons = document.querySelectorAll('.readMore');

    readMoreButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        showModal(porcelain[index]); // Pass the product to showModal
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
  cardContainer.classList.add("porcelainCard", "container", "mt-5", "mb-5", "col-sm-3");

  // Create the card itself
  const card = document.createElement("div");
  card.classList.add("card1", "p-3");

  // Create the image element
  const image = document.createElement("img");
  image.classList.add("porcelainImage");
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
// Modal for each product
// -----------------


const modalView = document.getElementById("myModal");

function showModal(product) {

  //Clear the current modal before showing a new modal
  modalView.innerHTML = '';

  // Centering the modal on the screen
  const centerDiv = document.createElement("div");
  centerDiv.classList.add("d-flex", "justify-content-center", "align-items-center", "my-5");

  // Creating constants that will show the modal for every product
  const myProduct = document.createElement("div");
  myProduct.classList.add("modal-content", "mx-5", "mt-5");

  //Creating the close button on the modal
  const closeButton = document.createElement("span");
  closeButton.classList.add("close", "p-2");
  closeButton.innerHTML = "&times";

  closeButton.addEventListener("click", () => {
    modalView.style.display = 'none';
  });

  // Creating the product name
  const heading2 = document.createElement("h2");
  heading2.classList.add("heading2Modal");
  heading2.innerHTML = product.getName;
  console.log(heading2);

  // This is the row that contains the 2 columns
  const myRow = document.createElement("div");
  myRow.classList.add("row");

  // First column
  const myColumn1 = document.createElement("div");
  myColumn1.classList.add("column");

  // Creating the zoom container
  const div1 = document.createElement("div");
  div1.classList.add("img-zoom-container");

  // Creating the original image inside the modal
  const modalImage = document.createElement("img");
  modalImage.classList.add("productModal", "px-2");
  modalImage.setAttribute("id", "modalImage");
  modalImage.setAttribute("src", product.getImage);

  /* create the zoom result element */
  const result = document.createElement("div");
  result.classList.add("img-zoom-result");

  // Column 1 inside
  div1.appendChild(modalImage);
  div1.appendChild(result);
  myColumn1.appendChild(div1);

  let cx, cy;

  /*create lens:*/
  const lens = document.createElement("div");
  lens.setAttribute("class", "img-zoom-lens");

  /*insert lens:*/
  modalImage.parentElement.insertBefore(lens, modalImage);

  /*The lens will move when hovering over the image*/
  lens.addEventListener("mousemove", moveLens);
  modalImage.addEventListener("mousemove", moveLens);

  modalImage.addEventListener('load', () => {
    /*calculate the ratio between result DIV and lens:*/
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;

    /*set background properties for the result div*/
    result.style.backgroundImage = "url('" + modalImage.src + "')";
    result.style.backgroundSize = (modalImage.width * cx) + "px " + (modalImage.height * cy) + "px";

  })

  function moveLens(e) {

    let pos, x, y;

    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();

    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);

    /*calculate the position of the lens:*/
    x = pos.x - (lens.offsetWidth / 1);
    y = pos.y - (lens.offsetHeight / 1);

    /*prevent the lens from being positioned outside the image:*/
    if (x > modalImage.width - lens.offsetWidth) { x = modalImage.width - lens.offsetWidth; }
    if (x < 0) { x = 0; }
    if (y > modalImage.height - lens.offsetHeight) { y = modalImage.height - lens.offsetHeight; }
    if (y < 0) { y = 0; }

    /*set the position of the lens:*/
    lens.style.left = x + "px";
    lens.style.top = y + "px";

    /*display what the lens "sees":*/
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";

    function getCursorPos(e) {
      let a, x = 0, y = 0;
      e = e || window.event;

      /*get the x and y positions of the image:*/
      a = modalImage.getBoundingClientRect();

      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;

      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  }

  // Column 2
  const myColumn2 = document.createElement("div");
  myColumn2.classList.add("column");

  const unordered = document.createElement("ul");

  // Split the description text by line breaks
  const descriptionLines = product.getDescription.split('\n');

  // Loop through each line and create a list item for it
  descriptionLines.forEach((line) => {
    if (line.trim() !== "") {
      const listItem = document.createElement("li");
      listItem.textContent = line.trim();
      unordered.appendChild(listItem);
    }
  });

  // Creating the Price 
  const headingThree = document.createElement("h3");
  headingThree.classList.add("p-5");
  headingThree.innerHTML = "R" + product.getPrice + " each";

  const centerDiv2 = document.createElement("div");
  centerDiv2.classList.add("d-flex", "justify-content-center", "align-items-center");

  // Creating the Go to Cart button inside the modal
  const buttonNew = document.createElement("button");
  buttonNew.classList.add("btn", "cardButtons", "p-2");
  buttonNew.innerHTML = "Add to Cart";

  buttonNew.addEventListener('click', () => {
    showCart();
  })

  // Column 2 inside
  myColumn2.appendChild(unordered);
  myColumn2.appendChild(headingThree);
  myColumn2.appendChild(centerDiv2);
  myColumn2.appendChild(buttonNew);


  //Row 
  myRow.appendChild(myColumn1);
  myRow.appendChild(myColumn2);

  // Product
  myProduct.appendChild(closeButton);
  myProduct.appendChild(heading2);
  myProduct.appendChild(myRow);


  // The modal display
  centerDiv.appendChild(myProduct);
  modalView.appendChild(centerDiv);
  modalView.style.display = "block";
}


// -----------------
// Sorting section
// -----------------


//The products will be sorted automatically in alphabetical order
const alphabeticallySort = document.querySelector(".alphabetically");
alphabeticallySort.addEventListener('click', sortProducts);

function sortProducts() {

  const cardsAlphabetically = Array.from(document.querySelectorAll('.porcelainCard'));
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
  const cardsLow = Array.from(document.querySelectorAll('.porcelainCard'));
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
  const cardsLow = Array.from(document.querySelectorAll('.porcelainCard'));
  cardsLow.sort((a, b) => {
    const priceA = parseFloat(a.querySelector('h4').textContent.replace('R ', ''));
    const priceB = parseFloat(b.querySelector('h4').textContent.replace('R ', ''));
    return priceB - priceA;
  });
  const containerLow = document.querySelector('.allCards');
  containerLow.innerHTML = '';
  cardsLow.forEach(card => containerLow.appendChild(card));
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

