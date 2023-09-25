import { supabase } from '../../supabase';
import { userLocalStorage } from './helper';

const loginForm = document.querySelector('#loginForm');

async function submitLoginForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form input values
    const email = loginForm.elements.email.value;
    const password = loginForm.elements.password.value;

    try {
        // Query the database to check if the user exists
        const { data, error } = await supabase
            .from('users')
            .select('user_id, username, fullname, address, phoneNumber, email, password') 
            .eq('email', email)
            .eq('password', password)
            .single();

        if (error) {
            console.error('Error querying data:', error);
            alert('You are not registered! Please register with us to continue.')
            // Redirect users to the Sign Up page with the correct username
            window.location.href = '../users/signUp.html';
        } else if (data) {
            // User with the provided email and password exists
            const user_id = data.user_id;
            const username = data.username;
            const fullname = data.fullname; 
            const address = data.address;
            const phoneNumber = data.phoneNumber;
            const email = data.email;
            const password = data.password;

            // Update the fullname in localStorage
            localStorage.setItem('loggedInFullName', fullname);

            userLocalStorage(user_id, username, fullname, address, phoneNumber, email, password);

            // Show alert
            alert("You are logged in!")
            // Redirect users to the home page with the correct username
            window.location.href = '../../index.html';
        } else {
            // User not found in the database
            alert('You are not registered in the database.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Add an event listener to the form submission
loginForm.addEventListener('submit', submitLoginForm);
