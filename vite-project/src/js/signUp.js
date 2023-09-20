import { User } from '../js/products';
import { supabase } from '../../supabase';


// Add the information to localStorage
function userLocalStorage(username, fullname, address, phoneNumber, email, password) {
    localStorage.setItem('loggedInUsername', username);
    localStorage.setItem('loggedInFullName', fullname);
    localStorage.setItem('loggedInAddress', address);
    localStorage.setItem('loggedInPhoneNumber', phoneNumber);
    localStorage.setItem('loggedInEmail', email);
    localStorage.setItem('loggedInPassword', password);
}


// Add an event listener to the form submission
const registerForm = document.querySelector('#registerForm');

async function submitRegisterForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form input values
    const username = registerForm.elements.username.value;
    const fullname = registerForm.elements.fullname.value;
    const address = registerForm.elements.address.value;
    const password = registerForm.elements.password.value;
    const email = registerForm.elements.email.value;
    const phoneNumber = registerForm.elements.phoneNumber.value;

    try {
        // Check if a user with the same email or phoneNumber already exists
        const { data: existingUsers, error: existingUsersError } = await supabase
            .from('users')
            .select('email, phoneNumber')
            .or(`email.eq.${email},phoneNumber.eq.${phoneNumber}`);

        if (existingUsersError) {
            console.error('Error checking existing users:', existingUsersError);
            return;
        }

        if (existingUsers.length > 0) {
            // User with the same email or phoneNumber already exists
            alert('A user with the same email or phone number already exists.');
            registerForm.reset();
            return;
        }

        // If no existing user with the same email or phoneNumber, insert the new user
        const newUser = new User(username, fullname, address, password, email, phoneNumber);

        const { data, error } = await supabase.from('users').upsert([newUser]);

        if (error) {
            console.error('Error inserting data:', error);
        } else {
            console.log("User added to database!")
            alert('Thank you for registering!');

            // Reset the form again
            registerForm.reset();

            // Retrieve the username from the form input
            const username = newUser.getUsername;
            const fullname = newUser.getFullName;
            const address = newUser.getAddress;
            const phoneNumber = newUser.getPhoneNumber;
            const email = newUser.getEmail;
            const password = newUser.getPassword;

            // Store the information in local storage
            userLocalStorage(username, fullname, address, phoneNumber, email, password);

            // Direct users to the home page
            window.location.href = '../../index.html';

            // Display the username in the UI
            const loggedInUsernameSpan = document.getElementById('loggedInUsernameSpan');
            loggedInUsernameSpan.textContent = username;
            loggedInUsernameSpan.style.display = 'inline';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Add an event listener to the form submission
registerForm.addEventListener('submit', submitRegisterForm);
