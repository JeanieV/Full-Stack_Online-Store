import { supabase } from '../../supabase';

// -----------------
// Connection to Supabase
// -----------------

// Function to fetch the existing user data
async function fetchUserData() {
    try {
        const email = localStorage.getItem('loggedInEmail');
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email);

        if (error) {
            throw error;
        }

        return data[0]; // Assuming there's only one user with the specified email
    } catch (error) {
        throw error;
    }
}

// Handle form submission
const accountForm = document.getElementById("accountForm");

accountForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    try {
        // Fetch the existing user data from the Supabase database
        const existingUserData = await fetchUserData();

        // Get the new values from the form inputs
        let newUsername = accountForm.elements.newUsername.value;
        let newFullname = accountForm.elements.newFullname.value;
        let newAddress = accountForm.elements.newAddress.value;
        let newPassword = accountForm.elements.newPassword.value;
        let newEmail = accountForm.elements.newEmail.value;
        let newPhoneNumber = accountForm.elements.newPhoneNumber.value;

        // Check if form inputs are empty or null and use existing values if so
        if (!newUsername) {
            newUsername = existingUserData.username;
        }
        if (!newFullname) {
            newFullname = existingUserData.fullname;
        }
        if (!newAddress) {
            newAddress = existingUserData.address;
        }
        if (!newPassword) {
            newPassword = existingUserData.password;
        }
        if (!newEmail) {
            newEmail = existingUserData.email;
        }
        if (!newPhoneNumber) {
            newPhoneNumber = existingUserData.phoneNumber;
        }

        // Use an API or database query to update the user's information
        await updateUserInformation(newUsername, newFullname, newAddress, newPassword, newEmail, newPhoneNumber);

        // Display a success message or update the UI to reflect the changes
        alert("Account information updated successfully");

        // Direct users to the home page
        window.location.href = './profile.html';

    } catch (error) {
        // Handle any errors that occur during the update process
        console.error("Error updating account:", error);
        alert("Error updating account information");
    }
});

// Define the updateUserInformation function
async function updateUserInformation(newUsername, newFullname, newAddress, newPassword, newEmail, newPhoneNumber) {
    try {
        const email = localStorage.getItem('loggedInEmail');

        // Create an object with the new user data
        const updates = {
            username: newUsername,
            fullname: newFullname,
            address: newAddress,
            password: newPassword,
            email: newEmail,
            phoneNumber: newPhoneNumber
        };

        // Update the user's information in the 'users' table in your Supabase database
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('email', email); // Update the user with the matching email

        if (error) {
            throw error;
        }

        // Handle the success case
        console.log('User information updated:', data);

        // Update local storage with the new user data
        localStorage.setItem('loggedInUsername', newUsername);
        localStorage.setItem('loggedInFullName', newFullname);
        localStorage.setItem('loggedInAddress', newAddress);
        localStorage.setItem('loggedInEmail', newEmail);
        localStorage.setItem('loggedInPhoneNumber', newPhoneNumber);

        // Return the updated user data if needed
        return data;
    } catch (error) {
        // Handle any errors that occur during the update process
        console.error('Error updating user information:', error);
        throw error;
    }
}
