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

// add toys to page on load
let toys = [];
fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => toys = json)
  .then(createToys)

const toyCollection = document.getElementById('toy-collection')
const toyCard = document.getElementById('card')

function addCardDiv(toy){
  let newDiv = document.createElement('div')
  newDiv.setAttribute('class', `card toy_${toy.id}`);
  toyCollection.appendChild(newDiv);

  let header = document.createElement('h2')
  header.innerHTML = toy.name
  newDiv.appendChild(header)

  let toyImage = document.createElement('img')
  toyImage.src = toy.image
  toyImage.setAttribute('class', 'toy-avatar')
  newDiv.appendChild(toyImage)

  let toyP = document.createElement('p')
  toyP.innerHTML = toy.likes + " Likes"
  newDiv.appendChild(toyP)

  let toyBtn = document.createElement('button')
  toyBtn.setAttribute('class', 'likes-btn')
  toyBtn.innerHTML = 'Like'
  newDiv.appendChild(toyBtn)
  toyBtn.addEventListener('click', function(e) {
    addLike(toy)
  }) //trigger the listener for the like button

}

function createToys() {
  for(const toy of toys) {
    addCardDiv(toy);
    }
}

// add toys to page on form submit
function submitData(toyName, toyImageURL){
  let formData = {
      name: toyName,
      image: toyImageURL,
      likes: 0
    };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

  return fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json();
    })
    .then(function(object) {
      return addCardDiv(object);
    })
    .catch(function(error) {
    alert(error.message);
    });
}

let form = document.querySelector('.add-toy-form')
let inputText = document.querySelectorAll('.input-text')

form.addEventListener('submit', function(event) {
    event.preventDefault();
    submitData(inputText[0].value, inputText[1].value);
    form.reset();
});

// add selector for all 'Like' buttons and an event listener to click them. return content to figure out how to add that particular toy's like
function addLike(toy) {
  let configObj = {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": toy.likes + 1
    })
  };

  return fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
    .then(function(response) {
      return response.json();
      })
      .then(function(object) {
        return updateLikes(object); // function to add likes to DOM
      })
      .catch(function(error) {
      alert(error.message);
      });
}


function updateLikes(toy) {
  let toyP = document.querySelector(`.toy_${toy.id} p`).innerHTML = `${toy.likes} Likes`
}
