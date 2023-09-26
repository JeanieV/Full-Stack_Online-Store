import { User } from '../js/classes';
import { supabase } from '../../supabase';

// -----------------
// Connection to Supabase
// -----------------

// Function to fetch and use data
const fetchData = async () => {

  try {
    // Fetch products from the Supabase database using the Ceramic class
    const users = await User.fetchAll();
    console.log(users);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Call the fetchData function to initiate data fetching
fetchData();


// Creating a div for infoBackground
const userLoggedIn = document.getElementById("userLogged");

function profileInfo() {

  // Getting the fullname from the localStorage
  const fullname = localStorage.getItem('loggedInFullName');

  if (fullname) {
    // Clear the current modal before showing a new modal
    userLoggedIn.innerHTML = '';

    // Create and set up the delete button
    const button1 = document.createElement("button");
    button1.classList.add("accountButton", "p-2", "m-4");
    button1.title = "Delete Account";
    button1.id = "deleteAccount";
    button1.innerHTML = "Delete Account";

    // Append the button to the profile content (centerProfileDiv)
    userLoggedIn.appendChild(button1);

    // Create and set up the edit button
    const button2 = document.createElement("button");
    button2.classList.add("accountButton", "p-2", "m-4");
    button2.title = "Edit Account";
    button2.id = "editAccount";
    button2.innerHTML = "Edit Account";

    // Append the button to the profile content (centerProfileDiv)
    userLoggedIn.appendChild(button2);

    const centerProfileDiv = document.createElement("div");
    centerProfileDiv.classList.add("d-flex", "justify-content-center", "align-items-center");

    // Creating the profile information
    const profile = document.createElement("div");
    profile.classList.add("content-cart", "mx-5", "mt-5");

    // Creating the Heading
    const heading1 = document.createElement("h2");
    heading1.classList.add("heading2Modal", "pb-2");
    heading1.innerHTML = "Your Profile Information:";

    const centerDiv = document.createElement("div");
    centerDiv.classList.add("d-flex", "justify-content-center", "align-items-center", "my-5");

    // Creating a table element
    const table = document.createElement("table");

    // Retrieve user information from localStorage
    const username = localStorage.getItem('loggedInUsername');
    const address = localStorage.getItem('loggedInAddress');
    const email = localStorage.getItem('loggedInEmail');
    const phoneNumber = localStorage.getItem('loggedInPhoneNumber');

    // Create table rows and cells for each user attribute
    const attributes = ["Username", "Full Name", "Address", "Email", "Phone Number"];
    const userValues = [username, fullname, address, email, phoneNumber];

    for (let i = 0; i < attributes.length; i++) {
      const row = document.createElement("tr");

      const attributeCell = document.createElement("td");
      attributeCell.classList.add("labelStyle", "p-5");
      attributeCell.textContent = attributes[i];

      const valueCell = document.createElement("td");
      valueCell.textContent = userValues[i];

      row.appendChild(attributeCell);
      row.appendChild(valueCell);
      table.appendChild(row);
    }

    // Append the table to the centerDiv for centering
    centerDiv.appendChild(table);

    // Append centerDiv to the profile content
    profile.appendChild(heading1);
    profile.appendChild(centerDiv);

    // Append the profile content to the centerProfileDiv
    centerProfileDiv.appendChild(profile);

    // Append centerProfileDiv to userLoggedIn
    userLoggedIn.appendChild(centerProfileDiv);

    // Ensure userLoggedIn is displayed
    userLoggedIn.style.display = "block";
  } else {
    // Handle the case when fullname is not found in localStorage
    userLoggedIn.innerHTML = ''; // Clear the current content

    const centerDiv = document.createElement("div");
    centerDiv.classList.add("d-flex", "justify-content-center", "align-items-center", "my-5");

    // Creating the "Welcome!" message
    const noFullnameMessage = document.createElement("h2");
    noFullnameMessage.classList.add("heading2Modal", "p-5");
    noFullnameMessage.textContent = 'Please register or log in to view your profile information.';

    centerDiv.appendChild(noFullnameMessage);

    // Append centerDiv to the userLoggedIn element
    userLoggedIn.appendChild(centerDiv);

    // Ensure userLoggedIn is displayed
    userLoggedIn.style.display = "block";
  }
}

// Calling the profile information function to display
profileInfo();


// This is where the user account will be deleted
const deleteAccountButton = document.getElementById("deleteAccount");
deleteAccountButton.addEventListener("click", confirmDeleteAccount);

// Function to confirm account deletion
function confirmDeleteAccount() {

  // Display a confirmation dialog
  const confirmation = confirm("Are you sure you want to delete your account? This action cannot be undone.");

  if (confirmation) {
    // User confirmed, proceed with account deletion
    deleteAccount();
  }
}

// Function to delete the user's account from Supabase
async function deleteAccount() {
  try {
    // Get the username or identifier of the user to be deleted
    const username = localStorage.getItem('loggedInUsername');

    // Connect to the database
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('username', username)
      .single();

    if (error) {

      console.error('Error deleting account:', error);

      alert('Error deleting account. Please try again later.');

    } else {
      // Account deleted successfully
      alert('Your account has been deleted successfully.');

      // Clear user data from local storage
      localStorage.removeItem('loggedInUsername');
      localStorage.removeItem('loggedInFullName');
      localStorage.removeItem('loggedInAddress');
      localStorage.removeItem('loggedInPhoneNumber');
      localStorage.removeItem('loggedInEmail');
      localStorage.removeItem('loggedInPassword');

      // Redirect the user to the index page or another appropriate location
      window.location.href = '../../index.html';
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  }
}


// This is where the user can edit the account
const editAccountButton = document.getElementById("editAccount");

editAccountButton.addEventListener("click", function() {
  
  const editAccountPageURL = "./edit.html";
  
  // Redirect the user to the edit account page
  window.location.href = editAccountPageURL;
});