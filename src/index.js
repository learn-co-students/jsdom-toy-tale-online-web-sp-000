let addToy = false;
const toyCollectionDiv = document.getElementById('toy-collection');
const toyFormContainer = document.querySelector(".container");
const addToyForm = document.forms[0];


document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys();

  addToyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log(e);
    let name = document.querySelectorAll('.input-text')[0].value
    let image = document.querySelectorAll('.input-text')[1].value
    submitForm(name, image);
  })

});

function fetchToys() {
  return fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => {
    data.forEach(toy => {
      renderToy(toy);
    });
  })
}

function renderToy(toyObject) {

  const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'card');

    const h2 = document.createElement('h2');
    h2.innerText = toyObject.name;

    const img = document.createElement('img');
    img.setAttribute('class', 'toy-avatar');
    img.setAttribute('src', toyObject.image);

    const p = document.createElement('p');
    p.innerText = `${toyObject.likes} Likes`;

    const button = document.createElement('button');
    button.setAttribute('class', 'like-btn');
    button.innerText = "Like <3";

    

    const hiddenID = document.createElement('div');
    hiddenID.style.display = 'none';
    hiddenID.innerText = toyObject.id;

    newDiv.appendChild(h2);
    newDiv.appendChild(img);
    newDiv.appendChild(p);
    newDiv.appendChild(button);
    newDiv.appendChild(hiddenID);


    toyCollectionDiv.appendChild(newDiv);

    button.addEventListener('click', () => {
      addLike(hiddenID, p);
    })
}

function submitForm(name, image) {
  return fetch("http://localhost:3000/toys", {
  method: "POST",
  headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
  },
  body: JSON.stringify({
   name : name,
  image : image,
  likes : 0
  })
})
.then(response => response.json())
.then(toy => {
  renderToy(toy);
  addToyForm.reset();
  toyFormContainer.style.display = 'none';
})
}

function addLike(toyIDElement, likesElement) {
  const newLikes = parseInt(likesElement.innerText) + 1;
   return fetch(`http://localhost:3000/toys/${toyIDElement.innerText}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
      likes :  parseInt(likesElement.innerText) + 1
    })
    
    
  })
  .then(() => {likesElement.innerText = newLikes + ' Likes'})
}