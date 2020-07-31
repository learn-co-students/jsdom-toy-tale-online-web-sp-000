let addToy = false;
const toyCollection = document.querySelector("#toy-collection");
const newToyform = document.getElementById('new-toy-form');

const buildCard = (toyData) => { 
  const card = document.createElement('div');
  card.class = "card";

  const eName = document.createElement('h2');
  eName.innerText = toyData.name;
  card.appendChild(eName);
  const eImg = document.createElement('img');
  eImg.class = "toy-avatar";
  eImg.src = toyData.image;
  card.appendChild(eImg);
  const eLikes = document.createElement('p');
  eLikes.innerText = `${toyData.likes} Likes`
  card.appendChild(eLikes);
  const eButton = document.createElement('button');
  eButton.class = "like-btn";
  eButton.innerText = "Like <3"
  card.appendChild(eButton);
  return card;

}

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

document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(responceData => { 
    let card = responceData.map(element => buildCard(element))
    .forEach(element => toyCollection.appendChild(element));
  });
});

// Submit New Toy
newToyform.addEventListener('submit', (event) => {
  event.preventDefault();
  let formData = {name: newToyform[0].value, image: newToyform[1].value,  likes: 0};
  const newCard = buildCard(formData)
  toyCollection.appendChild(newCard);
  
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
   
  fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      console.log(object);
    })
    .catch(function(error) {
      alert(error.message);
      console.log(error.message);
    });
});