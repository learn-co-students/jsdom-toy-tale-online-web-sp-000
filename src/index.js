let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      document.querySelector('.submit').addEventListener('click', function(e) {
        let name = document.querySelectorAll('.input-text')[0].value;
        let img = document.querySelectorAll('.input-text')[1].value;
        createToy(name, img);
        document.querySelectorAll('.input-text')[0].value = "";
        document.querySelectorAll('.input-text')[1].value = "";
        e.preventDefault();
      }, false)
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys();
});

function getToys() {
  return fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    object.forEach(toy => {
      createDiv(toy);
    });
  });
}

function createDiv(toy) {
  let div = document.createElement('div');
  div.setAttribute('class', 'card');
  let name = document.createElement('h2');
  name.innerText = toy.name;
  let img = document.createElement('img');
  img.setAttribute('class', 'toy-avatar');
  img.src = toy.image;
  img.style.height = '200px';
  img.style.width = '200px';
  let p = document.createElement('p');
  p.innerText = `${toy.likes} Likes`;
  let btn = document.createElement('button');
  btn.setAttribute('class', 'like-btn');
  btn.setAttribute('id', toy.id);
  btn.innerText = "Like <3";
  btn.addEventListener('click', (e) => {
    console.log(e.target.previousElementSibling);
    likes(e)
  })
  div.appendChild(name);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(btn);
  document.getElementById('toy-collection').appendChild(div);
}

function createToy(toyName, toyImg) {
  return fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImg,
      likes: 0
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    createDiv(object);
  })
}

function likes(e) {
  e.preventDefault()

  return fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: parseInt(e.target.previousElementSibling.innerText) + 1
    })
  })
  .then(function(response) {
    response.json();
  })
  .then(function(obj) {
    e.target.previousElementSibling.innerText = `${parseInt(e.target.previousElementSibling.innerText) + 1} Likes`;
  })
}
