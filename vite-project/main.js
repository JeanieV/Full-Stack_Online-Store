import './src/css/home.css';
import { supabase } from "./supabase";

// Connecting to the Supabase database
const useData = async () => {
  const { data, error } = await supabase.from("users").select();
  return data;
}
const data = useData();
console.log(data);


// Get the button:
let backToTop = document.getElementById("backToTopButton");

backToTop.addEventListener("click", topFunction);

// When the user scrolls down 80px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.documentElement.scrollTop > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.documentElement.scrollTop = 800; // For Chrome, Firefox, IE and Opera
}

