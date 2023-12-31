import { User } from './classes';
import { supabase } from '../../supabase';
import { userLocalStorage } from './helper';

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
        const { data, error } = await supabase
            .from('users')
            .select('email, phoneNumber')
            .or(`email.eq.${email},phoneNumber.eq.${phoneNumber}`);

        if (error) {
            console.error('Error checking existing users:', data);
            return;
        }

        if (data.length > 0) {
            // User with the same email or phoneNumber already exists
            alert('A user with the same email or phone number already exists.');
            registerForm.reset();
            return;
        }

        // If no existing user with the same email or phoneNumber, insert the new user
        const newUser = new User(username, fullname, address, password, email, phoneNumber);

        await supabase.from('users').upsert([newUser]);

        if (error) {
            console.error('Error inserting data:', error);
        } else {


            console.log("User added to database!")
            alert('Thank you for registering!\nPlease log in to continue.');

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


