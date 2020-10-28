let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => {
        postToy(event.target)
    })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  let toys = fetchToys();
});

function fetchToys() {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => {
      console.log(json);
      renderToys(json);
    })
}

function postToy(form) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
          name: form.name.value,
          image: form.image.value,
          likes: 0
        })
    })
} 

function renderToys(json) {
  json.forEach(toy => { 
    const card = createCard(toy)
    const container = document.getElementById('toy-collection')
    container.appendChild(card)
  });
}

function createCard(toy) {
  const card = document.createElement("div");
  const h2 = document.createElement("h2");
  const img = document.createElement("img");
  const p = document.createElement("p");
  const button = document.createElement("button");

  h2.innerHTML = toy.name
  img.className = 'toy-avatar'
  img.src = toy.image
  p.innerHTML = `${toy.likes} likes`
  button.innetHTML = 'like <3'
  button.className = 'like-btn'
  button.setAttribute('id', toy.id)
  card.className = 'card'

  appendChilds(card, [h2, img, p, button]);

  button.addEventListener('click', event => {
    // debugger;
    modLikes(event);
  })

  return card
}

function appendChilds(parent, childs) {
  childs.forEach(child => {
    parent.appendChild(child)
  })
}
function modLikes(e) {
  let likes_plus1 = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": likes_plus1
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${likes_plus1} likes`;
    }))
}