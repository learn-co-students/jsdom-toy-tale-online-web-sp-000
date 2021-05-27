// let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// });

// Okay, yeah, I have no clue what this has to do with anything or why it's here without comment or "use this to write your code" or "this is here to give you an idea of what it's supposed to look like, delete it later" or what the fuck is going on and I give up trying to figure it out.

function fetchToys() {
    return fetch('http://localhost:300/toys').then(function(response) { return response.json()})
  }
  // Fetch Andy's Toys: GET request to fetch all the toy objects. In this case, all the data on the page as a json object
  // Because the function is basically a big return thing, FOR THESE PURPOSES it can be thought of as a variable called fetchToys
  
  function postToy(input) {
    fetch('http://localhost:3000/toys')
  }