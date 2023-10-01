import { supabase } from '../../supabase';
import { Product } from './classes';


// -----------------
// Local Storage
// -----------------

export function userLocalStorage(user_id, username, fullname, address, phoneNumber, email, password) {
  localStorage.setItem('loggedInUserId', user_id);
  localStorage.setItem('loggedInUsername', username);
  localStorage.setItem('loggedInFullName', fullname);
  localStorage.setItem('loggedInAddress', address);
  localStorage.setItem('loggedInPhoneNumber', phoneNumber);
  localStorage.setItem('loggedInEmail', email);
  localStorage.setItem('loggedInPassword', password);
}

// -----------------
// Sorting section
// -----------------


// Sort the product cards alphabetically
export function sortProducts() {

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

// Sort the product cards from low to high
export function sortProductsLow() {
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

// Sort the product cards to high to low
export function sortProductsHigh() {
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

// Filter and show product cards based on search input
export function filterProducts() {
  const searchInput = document.getElementById('searchInput');
  const searchValue = searchInput.value.toLowerCase();

  const cards = Array.from(document.querySelectorAll('.homeCard'));

  let noResults = false; // Flag to track if any card is displayed

  cards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const price = card.querySelector('h4').textContent;

    if (title.includes(searchValue) || price.includes(searchValue)) {
      card.style.display = 'block';
      noResults = true; 
    } else {
      card.style.display = 'none';
    }
  });

  // Show an alert if no cards are displayed
  if (!noResults) {
    alert('No matching products found for your search!');
    searchInput.value = '';
    cards.forEach(card => {
      card.style.display = 'block';
    });
  }
}



// -----------------
// Modal for each product
// -----------------

const modalView = document.getElementById("myModal");

export function showModal(product) {

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
  buttonNew.setAttribute("id", "addToCart");
  buttonNew.innerHTML = "Add to Cart";

  buttonNew.addEventListener('click', addToCart);

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
// Product cards section
// -----------------

export function generateProductCard(product) {

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
// Cart Section
// -----------------

// Check whether the product is already inside the cart and add a new one
export async function addToCart() {

  // Get the user_id from localStorage
  const user_id = parseInt(localStorage.getItem("loggedInUserId"));

  // Check if the user is logged in 
  if (!user_id || isNaN(user_id)) {
    console.error('User is not logged in.');
    alert('Kindly log in to place an order!')

    // Direct users to the home page
    window.location.href = '../../index.html';
    return;
  }

  // Get form input values
  const product_id = parseInt(localStorage.getItem("productID"));
  const product_category = localStorage.getItem("productCategory");
  const quantity = 1;
  const price = localStorage.getItem("price");
  const totalPrice = price * quantity;

  try {
    // Check if the product is already in the cart
    const { data, error } = await supabase
      .from('cart')
      .select()
      .eq('user_id', user_id)
      .eq('product_category', product_category)
      .eq('product_id', product_id);

    if (error) {
      console.error('Error querying cart:', error);

    } else if (data.length > 0) {

      // Product already exists in the cart
      alert('This product is already in your cart. Update the quantity.');
    } else {
      // Product doesn't exist in the cart, insert a new entry
      const { error: insertError } = await supabase.from('cart').insert({
        user_id: user_id,
        product_category: product_category,
        product_id: product_id,
        quantity: quantity,
        totalPrice: totalPrice
      });

      if (insertError) {
        console.error('Error inserting data:', insertError);
      } else {
        alert('Product has been added to your cart!');
      }
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

// -----------------
// Empty Shopping Cart
// -----------------

const cartView = document.getElementById("myModal");

export function emptyShoppingCart() {

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

// -----------------
// Fetching all the product tables (stoneware, porcelain, ceramic and tools)
// -----------------

// Creating a fetch call that gets the information from the product tables 
async function fetchProducts(table, productId) {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('product_id', productId);

    if (error) {
      throw error;
    }

    return data[0];
  } catch (error) {
    throw error;
  }
}

// -----------------
// Fetching the cart information
// -----------------


// Fetch the information from the cart table to show it in the showCart()
export async function fetchUserCart(user_id) {
  try {
    const { data, error } = await supabase
      .from('cart')
      .select('product_id, product_category, quantity, totalPrice')
      .eq('user_id', user_id);

    if (error) {
      throw error;
    }

    // Creating an empty products array to push the products in
    const products = [];

    for (const cartItem of data) {
      const { product_id, product_category } = cartItem;

      let productData;

      // Use if statements to determine the table to query based on product_category
      if (product_category === 'stoneware') {
        productData = await fetchProducts('stoneware', product_id);
      } else if (product_category === 'porcelain') {
        productData = await fetchProducts('porcelain', product_id);
      } else if (product_category === 'ceramic') {
        productData = await fetchProducts('ceramic', product_id);
      } else if (product_category === 'tools') {
        productData = await fetchProducts('tools', product_id);
      }

      // Create a Product object and add it to the products array
      if (productData) {
        const product = new Product(
          productData.product_id,
          productData.name,
          productData.description,
          productData.barcode,
          productData.price,
          productData.image,
          productData.category
        );
        products.push(product);
      }
    }
    console.log(products);

    return products;
  } catch (error) {
    throw error;
  }
}

// -----------------
// Shopping Cart
// -----------------

let subTotalValue;
let totalValue;

// Function to show the shopping cart
export function showCart() {
  const cartContainer = document.getElementById("myCart");

  // Clear the existing content of the cartContainer
  cartContainer.innerHTML = '';

  const user_id = parseInt(localStorage.getItem('loggedInUserId'));

  if (!user_id) {
    console.error('User is not logged in.');
    alert('Kindly log in to place an order!')

    // Direct users to the home page
    window.location.href = '../../index.html';
    return;
  }

  showLoadingState();


  // Fetch the specific user's cart items from the orders table
  fetchUserCart(user_id)
    .then((cartItems) => {

      hideLoadingState();

      // If there is nothing in the cart table for the user
      if (cartItems.length === 0) {
        emptyShoppingCart();

        // If the user added products to their cart
      } else {

        const centerCartDiv = document.createElement("div");
        centerCartDiv.classList.add("d-flex", "justify-content-center", "align-items-center", "my-5");

        // Creating the cart modal elements
        const mycart = document.createElement("div");
        mycart.classList.add("content-cart", "mx-5", "mt-5");

        const buttonClose = document.createElement("span");
        buttonClose.classList.add("close", "p-2");
        buttonClose.innerHTML = "&times";

        buttonClose.addEventListener("click", () => {
          // Hide the cart modal when the close button is clicked
          cartContainer.style.display = 'none';
        });

        const fullname = localStorage.getItem('loggedInFullName');

        if (fullname) {

          const customerName = document.createElement("h2");
          customerName.classList.add("heading2Modal", "pb-3");
          customerName.textContent = `Hi there, ${fullname}!`;

          // Appending "Invoice" name before the table
          mycart.appendChild(buttonClose);
          mycart.appendChild(customerName);

          const centerDiv1 = document.createElement('div');
          centerDiv1.classList.add("col-md-12", "text-center");

          const invoiceName = document.createElement("h2");
          invoiceName.classList.add("heading2Modal", "pb-3");
          invoiceName.innerHTML = "Invoice";
          centerDiv1.appendChild(invoiceName);

          const cartDate = document.createElement("p");
          cartDate.innerHTML = "Date: " + new Date().toLocaleDateString();
          cartDate.classList.add("invoice-date", "pb-5");

          centerDiv1.appendChild(cartDate);

          const table = document.createElement('table');
          table.classList.add("table", "table-striped");

          // Create table header
          const headerRow = document.createElement("tr");

          // Creating the image heading that will show in the table
          const tableHeadImage = document.createElement("th");
          tableHeadImage.classList.add("tableHeadings", "pb-5");
          tableHeadImage.innerHTML = "Image";

          // Creating the product name heading that will show in the table
          const tableHeadProductName = document.createElement("th");
          tableHeadProductName.classList.add("tableHeadings", "pb-5");
          tableHeadProductName.innerHTML = "Product Name";

          // Creating the quantity heading that will show in the table
          const tableHeadQuantity = document.createElement("th");
          tableHeadQuantity.classList.add("tableHeadings", "pb-5");
          tableHeadQuantity.innerHTML = "Quantity";

          // Creating the price heading that will show in the table
          const tableHeadPrice = document.createElement("th");
          tableHeadPrice.classList.add("tableHeadings", "pb-5");
          tableHeadPrice.innerHTML = "Price";

          // Appending to table
          headerRow.appendChild(tableHeadImage);
          headerRow.appendChild(tableHeadProductName);
          headerRow.appendChild(tableHeadQuantity);
          headerRow.appendChild(tableHeadPrice);
          table.appendChild(headerRow);


          let subTotal = 0;
          let total = 0;

          // Table rows with the information in the productData mapping from each table
          for (const cartItem of cartItems) {

            // Creating the table data
            const row = document.createElement("tr");

            // Creating the image that will show in the table
            const productImage = document.createElement("td");
            productImage.classList.add("tableData", "pb-5");

            const imageColumn = document.createElement("img");
            imageColumn.src = cartItem.getImage;
            imageColumn.alt = cartItem.getName;
            imageColumn.classList.add("cart-image");
            productImage.appendChild(imageColumn);

            // Creating the product name that will shpw in the table
            const productName = document.createElement("td");
            productName.classList.add("tableData");
            productName.innerHTML = cartItem.getName;

            // Creating the product quantity that will show in the table
            const productQuantity = document.createElement("td");
            productQuantity.classList.add("tableData");

            // Creating the quantity input
            const quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.min = 1;
            quantityInput.max = 1000;
            quantityInput.value = cartItem.getQuantity || 1;
            quantityInput.classList.add("quantity-input");


            // Add this code inside the loop where you create quantityInput elements
            quantityInput.addEventListener('change', async (event) => {
              const newQuantity = parseInt(event.target.value);
              const newTotalPrice = newQuantity * cartItem.getPrice;

              // Update the quantity and total price in the Supabase cart table
              await updateQuantity(user_id, cartItem.getCategory, cartItem.getProductId, newQuantity, newTotalPrice);

              // Update the cart item's quantity and total price in your local data
              cartItem.getQuantity = newQuantity;
              cartItem.getTotalPrice = newTotalPrice;

              // Recalculate and update the subtotal and total
              updateTotals();
            });




            // Creating the Product Price that will show in the cart
            const productPrice = document.createElement("td");
            productPrice.classList.add("tableData");
            productPrice.innerHTML = "R" + cartItem.getPrice;
            cartItem.productPrice = productPrice;

            // Appending to the quantity in the table
            productQuantity.appendChild(quantityInput);

            // Creating the remove button that will delete the row
            const removeRowButton = document.createElement("td");
            removeRowButton.classList.add("tableData");

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("deleteButton", "p-3");
            deleteButton.textContent = "Delete";

            removeRowButton.appendChild(deleteButton);

            // Add a click event listener to the delete button
            deleteButton.addEventListener('click', () => {
              removeFromCart(user_id, cartItem.getProductId, cartItem.getCategory);
              row.remove();

              // Correct the subtotal by subtracting the price of the deleted product
              subTotal -= cartItem.getPrice;

              updateTotals();
            });

            row.appendChild(productImage);
            row.appendChild(productName);
            row.appendChild(productQuantity);
            row.appendChild(productPrice);
            row.appendChild(removeRowButton)
            table.appendChild(row);

            // Function to calculate and update subtotal and total
            function updateTotals() {

              // Iterate through cart items to calculate subtotal
              for (const cartItem of cartItems) {
                const itemSubtotal = cartItem.getPrice * cartItem.getQuantity;

                // Check if itemSubtotal is a valid number
                if (!isNaN(itemSubtotal)) {
                  subTotal += itemSubtotal;
                }
              }

              const deliveryFee = 90;

              if (subTotal === 0) {
                total = 0;
              }
              else {
                total = subTotal + deliveryFee;
              }
              // Update the subtotal and total values in the table
              subTotalValue.textContent = "R" + subTotal.toFixed(2);
              totalValue.textContent = "R" + total.toFixed(2);
            }

            // Calculate subtotal for each item and add it to the total
            subTotal += cartItem.getPrice;
          }


          // Creating the Sub Total row and label
          const subTotalRow = document.createElement("tr");
          const subTotalLabel = document.createElement("td");
          subTotalLabel.classList.add("priceHeadings");
          subTotalLabel.colSpan = 1;
          subTotalLabel.textContent = "Sub-Total";

          // Creating the value 
          subTotalValue = document.createElement("td");
          subTotalValue.classList.add("tableData1");
          subTotalValue.textContent = "R" + subTotal;

          subTotalRow.appendChild(subTotalLabel);
          subTotalRow.appendChild(subTotalValue);
          table.appendChild(subTotalRow);

          // Calculate the total by adding the delivery fee
          const deliveryFee = 90;
          total = subTotal + deliveryFee;

          // Creating the Delivery row and label
          const deliveryRow = document.createElement("tr");
          const deliveryLabel = document.createElement("td");
          deliveryLabel.classList.add("priceHeadings");
          deliveryLabel.colSpan = 1;
          deliveryLabel.textContent = "Standard Delivery";

          // Creating the value
          const deliveryValue = document.createElement("td");
          deliveryValue.classList.add("tableData1");
          deliveryValue.textContent = "R" + deliveryFee;
          deliveryRow.appendChild(deliveryLabel);
          deliveryRow.appendChild(deliveryValue);
          table.appendChild(deliveryRow);

          // Creating the Total row and label
          const totalRow = document.createElement("tr");
          const totalLabel = document.createElement("td");
          totalLabel.classList.add("priceHeadings");
          totalLabel.colSpan = 1;
          totalLabel.textContent = "Total";

          // Creating the value
          totalValue = document.createElement("td");
          totalValue.classList.add("tableData1");
          totalValue.textContent = "R" + total;
          totalRow.appendChild(totalLabel);
          totalRow.appendChild(totalValue);
          table.appendChild(totalRow);


          // Appending the table after the "Invoice" name
          mycart.appendChild(centerDiv1);
          mycart.appendChild(table);
        }

        // Append the cart modal container to the cartContainer
        centerCartDiv.appendChild(mycart);
        cartContainer.appendChild(centerCartDiv);

        // Display the cart modal
        cartContainer.style.display = "block";
      }
    })
}


// -----------------
// Update the Quantity
// -----------------

// Function to update quantity in the Supabase cart table
async function updateQuantity(user_id, product_category, product_id, newQuantity, newTotalPrice) {
  try {
    const { error } = await supabase
      .from('cart')
      .update({
        quantity: newQuantity,
        totalPrice: newTotalPrice
      })
      .eq('user_id', user_id)
      .eq('product_category', product_category)
      .eq('product_id', product_id);

    if (error) {
      console.error('Error updating quantity:', error);
      return null;
    }

  } catch (error) {
    console.error('Error updating quantity:', error);
    return null;
  }
}


// -----------------
// Remove the product
// -----------------

// Delete the item from the cart table
async function removeFromCart(user_id, product_id, product_category) {

  try {
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('user_id', user_id)
      .eq('product_id', product_id) // Add this line
      .eq('product_category', product_category) // Add this line
      .single();

    if (error) {
      console.error('Error deleting item from cart:', error);
    } else {
      console.log('Item deleted from cart successfully.');
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
}

// -----------------
// Loading state for user
// -----------------

// Display the loading state when a Supabase request is made
export function showLoadingState() {

  const loadingState = document.getElementById("loadingState");
  loadingState.style.display = "block";
}

// Hide the loading state when content has loaded
export function hideLoadingState() {

  const loadingState = document.getElementById("loadingState");
  loadingState.style.display = "none";

}



