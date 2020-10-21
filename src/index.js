let addToy = false;

function processForm(e) {
  if (e.preventDefault) e.preventDefault();
  const toyFormContainer = document.querySelector(".container");
  toyFormContainer.style.display = "none";
  addToy = false;
  let myToy = {};
  myToy.name = document.getElementById('add-toy-name').value;
  myToy.image = document.getElementById('add-toy-image').value;
  myToy.likes = 0;
  addNewToy(myToy);

  // You must return false to prevent the default form behavior
  return false;
}

function addNewToy(myToy){
  let myPost = postRequest(createPostObject(myToy));
  return myPost;
}

function updateLikes(newCard){
  let myLike = {};  
  let currentLikes = document.getElementById("likes-" + newCard.id);
  myLike.likes = parseInt(currentLikes.innerHTML) + 1;
  let myPost = patchRequest(newCard.id, createPatchObject(myLike));
}

function createPatchObject(myLike){
  let myPatchObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(myLike)
  };
  return myPatchObject;
};

function patchRequest(id, configObj){
  return fetch("http://localhost:3000/toys/" + id, configObj)
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            let currentLikes = document.getElementById("likes-" + id);
            currentLikes.innerHTML = object.likes;
          })
          .catch(function(error) {
            console.log(error.message);
          });
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("The DOM has loaded");

  let form = document.getElementById('add-toy-form');
  if (form.attachEvent) {
    form.attachEvent("submit", processForm);
  } else {
      form.addEventListener("submit", processForm);
  };

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    console.log("btnClick");
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function createGetObject(){
  let myGetObject = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };
  return myGetObject;
};

function createPostObject(newToy){
  let myGetObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToy)
  };
  return myGetObject;
};

function listToys(list){
  list.forEach(displayToy);
}

function displayToy(element, index){
  let toyList = document.getElementById('toy-collection');
  toyList.appendChild(createCard(element));
};

function createCard(element){
  let newCard = document.createElement("div");
  newCard.setAttribute("class", "card");
  newCard.setAttribute("id", element.id)
  let newElement = document.createElement("h2");
  newElement.innerHTML = element.name;
  newCard.appendChild(newElement);

  newElement = document.createElement("img");
  newElement.setAttribute("class", "toy-avatar");
  newElement.src = element.image;
  newCard.appendChild(newElement);

  newElement = document.createElement("p");
  newElement.setAttribute("id", "likes-" + element.id);
  newElement.innerHTML = element.likes;
  newCard.appendChild(newElement);
  
  newElement = document.createElement("button");
  newElement.setAttribute("class", "like-btn");  
  newElement.innerText = "Like";
  newElement.addEventListener("click", () => {
    console.log(element.id)
    console.log("likeClick");
    updateLikes(newCard);
  });
  newCard.appendChild(newElement);
  return newCard;
};



function getRequest(configObj){
  return fetch("http://localhost:3000/toys", configObj)
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            console.log("this is what was returned")
            console.log(object);
            listToys(object);
          })
          .catch(function(error) {
            console.log(error.message);
          });
};

function postRequest(configObj){
  return fetch("http://localhost:3000/toys", configObj)
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            console.log("this is what was returned")
            console.log(object);
            displayToy(object);
          })
          .catch(function(error) {
            console.log(error.message);
          });
};

function getToys(){
  let myPost = getRequest(createGetObject());
  return myPost;
};

getToys();
