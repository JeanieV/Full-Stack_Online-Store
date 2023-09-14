import { User } from '../js/products';
import { supabase } from '../../supabase';

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

    // Create a new Contact instance
    const newUser = new User(username, fullname, address, password, email, phoneNumber);

    try {
        // Insert the new contact into the "contact" table
        const { data, error } = await supabase.from('users').upsert([newUser]);

        if (error) {
            console.error('Error inserting data:', error);
        } else {
            alert('Thank you for registering at the Art of Pottery');
            // Reset the form again
            registerForm.reset();
            // Direct users to home page
            window.location.href = '../../index.html';
        }
    } catch (error) {
        console.error('Error:', error);
    }

}

// Add an event listener to the form submission
registerForm.addEventListener('submit', submitRegisterForm);