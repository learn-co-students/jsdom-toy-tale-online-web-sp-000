let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const newToyForm = document.querySelector('.add-toy-form');

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  newToyForm.addEventListener('submit', event => {
    event.preventDefault()
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
        name : document.querySelectorAll('input.input-text')[0].value,
        image : document.querySelectorAll('input.input-text')[1].value,
        likes : 0
      } )
    }

    fetch("http://localhost:3000/toys", configObj)
    .then(resp => resp.json())
    .then(json => newToy(json))
    event.target.reset()
  });

  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => iterateToys(json))
});

function iterateToys(json) {
  json.forEach(toy => newToy(toy))
};

function newToy(toy) {
  const toyCollection = document.getElementById('toy-collection')
  const toyCard = document.createElement("div")
  toyCard.className = "card"

  const toyName = document.createElement('h2')
  toyName.innerText = toy.name

  const toyImg = document.createElement('img')
  toyImg.className = "toy-avatar"
  toyImg.src = toy.image

  const toyLikes = document.createElement('p')
  toyLikes.innerText = `${toy.likes} likes`

  const toyBtn = document.createElement('button')
  toyBtn.className = "like-btn"
  toyBtn.innerText = "Like"
  toyBtn.setAttribute('id', toy.id)
  toyBtn.addEventListener('click', (e) => {
    addLike(e)
  })

  toyCard.appendChild(toyName)
  toyCard.appendChild(toyImg)
  toyCard.appendChild(toyLikes)
  toyCard.appendChild(toyBtn)

  toyCollection.appendChild(toyCard)

};

function addLike(e) {
  const newLikes = parseInt(e.target.previousElementSibling.innerText) + 1
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( {
      likes : newLikes
    } )
  }

  fetch(`http://localhost:3000/toys/${e.target.id}`, configObj)
  .then(resp => resp.json())
  .then((json => {
    e.target.previousElementSibling.innerText = `${newLikes} likes`;
  }))
};
