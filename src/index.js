// JS MANTRA:
// When some event happens, I want to make what kind of request and then manipulate the DOM in what way?


let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  addEventListenerToToyForm();
  increaseToyLikes();
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

function fetchToys (){
  fetch ("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => toys.forEach(toy => appendDiv(toy)));
  // toys is the array of 8 toy objects
}

function appendDiv(toy){
  const container = document.querySelector("#toy-collection");
  const newDiv = document.createElement("div");
  newDiv.classList.add('card');
  container.appendChild(newDiv);
  appendHeading(toy, newDiv);
  appendImage(toy, newDiv);
  appendLike(toy, newDiv);
  appendButton(newDiv);
}

function appendHeading(toy, newDiv){
  const newHeading = document.createElement("h2");
  newHeading.innerHTML = toy.name
  newDiv.appendChild(newHeading);
}

function appendImage(toy, newDiv){
  const newImage = document.createElement("img");
  newImage.classList.add('toy-avatar');
  newImage.src = toy.image
  newDiv.appendChild(newImage);
}

function appendLike(toy, newDiv){
  const newLike = document.createElement("p");
  newLike.innerHTML = `${toy.likes} likes`
  newDiv.appendChild(newLike);
}

function appendButton(newDiv){
  const newButton = document.createElement("button");
  newButton.classList.add('like-btn');
  newButton.innerHTML = "like <3"
  newDiv.appendChild(newButton);
}

function postToy (formData){
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
  
  fetch("http://localhost:3000/toys",configObj)
  .then(response => response.json())
  .then(json => {
    const name = json.name
    const image = json.image
    const likes = json.likes
    postNewToy(name, image, likes);
  })
}

function addEventListenerToToyForm() {
  const addToyForm = document.querySelector(".add-toy-form");

  addToyForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formName = event.target.name.value
    const formImage = event.target.image.value
    
    const formData = {
      name: formName,
      image: formImage,
      likes: 0
    };
    postToy(formData);
  });
}

function postNewToy(name, image, likes) {
  const container = document.querySelector("#toy-collection");
  const newDiv = document.createElement("div");

  newDiv.classList.add('card');
  container.appendChild(newDiv);
  // name
  const newToyName = document.createElement("h2");
  newToyName.innerHTML = name
  newDiv.appendChild(newToyName);
  // image
  const newImageName = document.createElement("img");
  newImageName.classList.add('toy-avatar');
  newImageName.src = image
  newDiv.appendChild(newImageName);
  // like
  const newLike = document.createElement("p");
  newLike.innerHTML = `${likes} likes`
  newDiv.appendChild(newLike);
  // button
  appendButton(newDiv);
}


// when user clicks like button
// 1. conditional increase to toy's like without reloading
// event listener to listen to the button when it is submitted
// add the like number right away to the front end, use a +1 counter
// 2. patch request sent to server updating number
// using the front end number to update the backend


function increaseToyLikes() {
  const buttonClass = document.querySelector(".like-btn");
  // const counter = 
  console.log(buttonClass)
  // buttonClass.addEventListener('submit', function(event) {
  //   event.preventDefault();
  //   console.log("it clicks")
  //   // const addLike = parseInt(counter.textContent++, 10);
  // })
}


