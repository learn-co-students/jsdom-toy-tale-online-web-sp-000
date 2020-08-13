let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//When the page loads, fetch all of the toys.

//GET fetch all toy objects
function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(json => createCard(json))
}

function createCard(json) {
  const toyCollection = document.querySelector('div#toy-collection');
  for (const toy of json) {
    let newDiv = document.createElement('div')
    newDiv.className = 'card'//give a new class name
    createName(toy, newDiv)//use functions to get the name, image, likes, and button - all part of challenge 2.
    createImage(toy, newDiv)
    createLikes(toy, newDiv)
    addButton(toy, newDiv)
    collection.appendChild(newDiv); //append this newDiv to to toyCollection
  }
}

//Challenge 2: Add Toy Info to the Card
//h2 tag with name
function createName(toy, card) {
  let name = document.createElement('h2')
  name.innerText = toy.name
  card.appendChild(name)
}

//img tag with src of toy's image attr and class name 'toy-avatar'
function createImage(toy, card) {
  let img = document.createElement('img')
  img.src = toy.image
  img.className = 'toy-avatar'
  card.appendChild(img)
}

//p tag with how many likes that toy has
function createLikes(toy, card) {
  let likes = document.createElement('p')
  likes.innerText = `${toy.likes} likes`
  card.appendChild(likes)
}

//button tag with class 'like-btn'
function addButton(toy, card) {
  let newButton = document.createElement('button')
  newButton.addEventListener('click', function() {
    increaseCount(toy);
    window.location.reload(true);
  })
  newButton.className = 'like-btn'
  card.appencChild(newButton)
}

//Challenge 3: Add a New Toy
/* When a user submits the toy form, a POST request is sent to http://localhost:3000/toys and the new toy is added to Andy's Toy Collection.
The toy should conditionally render to the page.
In order to send a POST request via Fetch, give the Fetch a second argument of an object. This object should specify the method as POST and also provide the appropriate headers and the JSON-ified data for the request. If your request isn't working, make sure your header and keys match the documentation.
*/

let form = document.querySelector('.add-toy-form')
form.addEventListener('submit', submitData)

function submitData() {
  let formData = {
    "name": document.querySelectorAll('.input-text')[0].Value,
    "image": document.querySelectorAll('.input-text')[1].value,
    "likes": "0"
  }
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
  fetch("http://localhost:3000/toys", configObj)
    .then(resp => resp.json())
    .then(json => console.log(json))
}


//Challenge 4

function increaseCount(toy) {
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": parseInt(toy.likes) + 1
    })
  };
  fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
}
