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
  // make a 'GET' request to fetch all the toy objects
  let toyCollection = document.querySelector("#toy-collection");
  let destUrl = "http://localhost:3000/toys";
  let toyData = {
    id: "",
    name: "",
    image: "",
    likes: ""
  };
  let configObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyData)
  }
  fetch(destUrl, configObj)
    .then(function(response) {
      return JSON.response();
    })
    .then(function(toyObj) {
      toyCollection.append(toyObj);
    });
});
