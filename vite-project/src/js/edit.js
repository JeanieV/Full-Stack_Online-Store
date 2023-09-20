import { User } from '../js/products';
import { supabase } from '../../supabase';


// -----------------
// Connection to Supabase
// -----------------

// // Function to fetch and use data
// const fetchData = async () => {

//     try {
//         // Fetch products from the Supabase database using the Ceramic class
//         const users = await User.fetchAll();
//         console.log(users);

//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// };

// // Call the fetchData function to initiate data fetching
// fetchData();


// // Handle form submission
// const accountForm = document.getElementById("accountForm");

// accountForm.addEventListener("submit", async function (e) {
//     e.preventDefault();

//     // Get the new values from the form inputs
//     const newUsername = accountForm.elements.newUsername.value;
//     const newFullname = accountForm.elements.newFullname.value;
//     const newAddress = accountForm.elements.newAddress.value;
//     const newPassword = accountForm.elements.newPassword.value;
//     const newEmail = accountForm.elements.newEmail.value;
//     const newPhoneNumber = accountForm.elements.newPhoneNumber.value;

//     try {
//         // Use an API or database query to update the user's information
//         await updateUserInformation(newUsername, newFullname, newAddress, newPassword, newEmail, newPhoneNumber);

//         // Display a success message or update the UI to reflect the changes
//         alert("Account information updated successfully");

//         // Direct users to the home page
//         window.location.href = './profile.html';

//     } catch (error) {
//         // Handle any errors that occur during the update process
//         console.error("Error updating account:", error);
//         alert("Error updating account information");
//     }

// });

// // Define the updateUserInformation function
// async function updateUserInformation(newUsername, newFullname, newAddress, newPassword, newEmail, newPhoneNumber) {
//     try {
//         const email = localStorage.getItem('loggedInEmail');

//         // Create an object with the new user data
//         const updates = {
//             username: newUsername,
//             fullname: newFullname,
//             address: newAddress,
//             password: newPassword,
//             email: newEmail,
//             phoneNumber: newPhoneNumber
//         };

//         // Update the user's information in the 'users' table in your Supabase database
//         const { data, error } = await supabase
//             .from('users')
//             .update(updates)
//             .eq('email', email); // Update the user with the matching email

//         if (error) {
//             throw error;
//         }

//         // Handle the success case
//         console.log('User information updated:', data);

//         // Return the updated user data if needed
//         return data;
//     } catch (error) {
//         // Handle any errors that occur during the update process
//         console.error('Error updating user information:', error);
//         throw error;
//     }
// }

