import { User } from '../js/products';

// -----------------
// Connection to Supabase
// -----------------

// Function to fetch and use data
const fetchData = async () => {

    const loadingIndicator = document.getElementById("loadingIndicator");
    loadingIndicator.style.display = "block";

  try {
    // Fetch products from the Supabase database using the Ceramic class
    const users = await User.fetchAll();
    console.log(users);

    // Hide the loading indicator once data is fetched
    loadingIndicator.style.display = "none";

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Call the fetchData function to initiate data fetching
fetchData();


