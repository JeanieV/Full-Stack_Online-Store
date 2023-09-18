import { supabase } from '../../supabase';

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
            .select('username')
            .eq('email', email)
            .eq('password', password)
            .single(); // Assuming each email is unique

        if (error) {
            console.error('Error querying data:', error);
            alert('You are not registered! Please register with us to continue.')
            // Redirect users to the Sign Up page with the correct username
            window.location.href = '../users/signUp.html';
        } else if (data) {
            // User with the provided email and password exists
            const username = data.username;
            localStorage.setItem('loggedInUsername', username);

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
