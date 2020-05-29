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

  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      makeToyCards(object);
    });

  const createNewToyForm = document.querySelector(".add-toy-form");
  createNewToyForm.addEventListener('submit', function(event) {
    const toyName = document.getElementsByName('name')[0].value;
    const toyImgPath = document.getElementsByName('image')[0].value;
    event.preventDefault();
    submitNewToy(toyName, toyImgPath);

    addToy = !addToy;
    toyFormContainer.style.display = "none";
  });

  let likeBtns = document.getElementsByClassName('like-btn');
  console.log(likeBtns);
  for(let i = 0; i < likeBtns.length; i++) {
    console.log('is this being reached');
    likeBtns[i].addEventListener('click', () => {
      console.log('I heard that!');
    })
  }

});

function makeToyCards(json) {
  let toyCollection = document.getElementById('toy-collection');
  for(const element of json) {
    let toy = document.createElement('div');
    toy.className = "card";

    let name = document.createElement('h2');
    name.innerHTML = element.name;
    toy.appendChild(name);

    let toyImage = document.createElement('img');
    toyImage.className = "toy-avatar";
    toyImage.src = element.image;
    toy.appendChild(toyImage);

    let toyLikes = document.createElement('p');
    toyLikes.innerHTML = `${element.likes} Likes`;
    toy.appendChild(toyLikes);

    let toyButton = document.createElement('button');
    toyButton.className = "like-btn";
    toyButton.innerHTML = "Like <3";
    toy.appendChild(toyButton);

    toyCollection.appendChild(toy);
  }
}

function makeNewToyCard(object) {
  let toyCollection = document.getElementById('toy-collection');

  let toy = document.createElement('div');
  toy.className = "card";

  let name = document.createElement('h2');
  name.innerHTML = object.name;
  toy.appendChild(name);

  let toyImage = document.createElement('img');
  toyImage.className = "toy-avatar";
  toyImage.src = object.image;
  toy.appendChild(toyImage);

  let toyLikes = document.createElement('p');
  toyLikes.innerHTML = '0 Likes';
  toy.appendChild(toyLikes);

  let toyButton = document.createElement('button');
  toyButton.className = "like-btn";
  toyButton.innerHTML = "Like <3";
  toy.appendChild(toyButton);

  toyCollection.appendChild(toy);
}

function submitNewToy(name, imgPath) {

  let formData = {
    name: name,
    image: imgPath,
    likes: 0
  }

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    makeNewToyCard(object);
  })
}

function addLike(element) {
  console.log(element);
}
