let addToy = false;
const toyCollection = document.getElementById("toy-collection")
const formButton = document.querySelector("input.submit")

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

function retrieveToys () {
  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      addToyCardToCollection(object);
      toyObject = object
    })
}

function addToyCardToCollection(toys) {
  for(toy of toys) {
    let newDiv = document.createElement('div')
    newDiv.setAttribute("id", "card")
    toyCollection.appendChild(newDiv)
    addToyInfoToCard(toy, newDiv);
  }
};

function addToyInfoToCard(toy, newDiv) {
  let h2 = document.createElement('h2')
  newDiv.appendChild(h2)
  h2.innerHTML = `${toy.name}`

  let img = document.createElement('img')
  newDiv.appendChild(img)
  img.src = toy.image

  let p = document.createElement('p')
  newDiv.appendChild(p)
  p.innerHTML = `${toy.likes} Likes`

  let button = document.createElement('button')
  newDiv.appendChild(button)
  button.setAttribute("class", "like-btn")
  button.innerHTML = "Like <3"
};

// --------------------------------------------

function postToys(toyName, toyImage) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": `${toyName}`,
      "image": `${toyImage}`,
      "likes": "0"
    })
  });
};

formButton.addEventListener("click", function(event) {
  let toyName = document.getElementsByName("name")[0].value
  let toyImage = document.getElementsByName("image")[0].value
  postToys(toyName, toyImage)
});

// --------------------------------------------

retrieveToys()
