let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  loadToys();
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});

function loadToys() {
  getToys().then(toys => toys.forEach(toy => addToyToCollection(toy)));
}

function getToys() {
  return fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json();
  })
}

function addToyToCollection(toy) {
  const toyCollection = document.getElementById('toy-collection')
  let div = document.createElement('div');
  div.classList.add('card');

  let h2 = document.createElement('h2')
  h2.innerText = toy.name;

  let img = document.createElement('img')
  img.classList.add('toy-avatar')
  img.src = toy.image;

  let p = document.createElement('p')
  p.innerText = toy.likes + ' likes';

  let button = document.createElement('button')
  button.classList.add('like-btn')
  button.innerText = 'Like'
  button.setAttribute('id', toy.id);
  button.addEventListener('click', (e) => {
    likeToy(e)
  })

  div.append(h2, img, p, button)
  toyCollection.append(div)
}

function submitToy(name, image) {
  let toyObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
  };
  return fetch('http://localhost:3000/toys', toyObj)
  .then(function(response) {
    return respons.json();
  })
  .then(object => addToyToCollection(object))
}

function likeToy(e) {
  e.preventDefault()
  let newNumberOfLikes = parseInt(e.target.previousElementSibling.innerText) + 1
  let toyObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: newNumberOfLikes
    })
  };
  return fetch(`http://localhost:3000/toys/${e.target.id}`, toyObj)
  .then(function(response) {
    return response.json();
  })
  .then(like_obj => {
      e.target.previousElementSibling.innerText = `${newNumberOfLikes} likes`;
    });
}
